<?php
/**
 * AMX Dubai Luxury Real Estate Theme functions and definitions.
 * Handles automatic theme assets compilation, discovery, and React bootstrap enqueues.
 *
 * @package AMX_Dubai_Listings_Theme
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Find compiled Vite production asset in theme folder
 */
function amx_get_hashed_asset_url($type) {
    $dir = get_template_directory() . '/dist/assets/';
    $pattern = $type === 'js' ? 'index-*.js' : 'index-*.css';
    $files = @glob($dir . $pattern);
    
    if (!empty($files)) {
        // Sort files to pick the newest compiled version
        usort($files, function($a, $b) {
            return filemtime($b) - filemtime($a);
        });
        $filename = basename($files[0]);
        return get_template_directory_uri() . '/dist/assets/' . $filename;
    }
    
    // Dev server fallback if production build hasn't run yet
    return '';
}

/**
 * Enqueue React App assets dynamically
 */
function amx_enqueue_theme_assets() {
    $js_url = amx_get_hashed_asset_url('js');
    $css_url = amx_get_hashed_asset_url('css');

    // If build assets exist, load them
    if ($js_url) {
        wp_enqueue_script('amx-theme-react-js', $js_url, array(), '1.0.0', true);
        
        // Filter script injection to load React as an ES Module
        add_filter('script_loader_tag', function($tag, $handle, $src) {
            if ('amx-theme-react-js' === $handle) {
                return '<script type="module" src="' . esc_url($src) . '" id="amx-theme-react-js-js"></script>';
            }
            return $tag;
        }, 10, 3);
    } else {
        // Dev server fallback loader in case the user runs a dev proxy live stream
        wp_enqueue_script('amx-theme-react-dev', 'http://localhost:3000/src/main.tsx', array(), '1.0.0', true);
        add_filter('script_loader_tag', function($tag, $handle, $src) {
            if ('amx-theme-react-dev' === $handle) {
                return '<script type="module" src="' . esc_url($src) . '"></script>';
            }
            return $tag;
        }, 10, 3);
    }

    if ($css_url) {
        wp_enqueue_style('amx-theme-react-css', $css_url, array(), '1.0.0');
    }

    // Register active styling overrides stylesheet
    if (file_exists(get_template_directory() . '/style.css')) {
        wp_enqueue_style('amx-theme-style', get_template_directory_uri() . '/style.css', array(), '1.0.0');
    }

    // Inject global settings configuration parameter placeholders safely
    wp_localize_script('amx-theme-react-js', 'amxWpSettings', array(
        'defaultView'  => 'grid',
        'themeMode'    => 'light',
        'limit'        => 12,
        'featuredOnly' => false,
        'wordpressMode'=> true
    ));
}
add_action('wp_enqueue_scripts', 'amx_enqueue_theme_assets');

/**
 * Setup elements that WordPress expects from a professional theme
 */
function amx_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
}
add_action('after_setup_theme', 'amx_theme_setup');
