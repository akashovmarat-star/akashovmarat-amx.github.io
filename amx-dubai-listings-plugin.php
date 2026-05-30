<?php
/**
 * Plugin Name: AMX Dubai Luxury Real Estate Portal Plugin
 * Plugin URI: https://amx.ae
 * Description: High-performance reactive estate catalog with interactive GIS maps and premium Dubai property specs. Exposes the [amx_dubai_listings] shortcode to embed the app anywhere.
 * Version: 1.0.0
 * Author: AMX Dubai Engineering
 * Author URI: https://amx.ae
 * License: GPL2
 */

// Prevent direct script access
if (!defined('ABSPATH')) {
    exit;
}

class AMX_Listings_Root_WordPress_Plugin {
    
    public function __construct() {
        // Register shortcode
        add_shortcode('amx_dubai_listings', array($this, 'render_listings_portal'));
        // Load production enqueued assets
        add_action('wp_enqueue_scripts', array($this, 'enqueue_listings_assets'));
    }

    /**
     * Find compiled Vite production asset in theme/plugin folder
     */
    private function get_hashed_asset_url($type) {
        $dir = plugin_dir_path(__FILE__) . 'dist/assets/';
        $pattern = $type === 'js' ? 'index-*.js' : 'index-*.css';
        $files = @glob($dir . $pattern);
        
        if (!empty($files)) {
            // Sort files to pick the newest compiled version
            usort($files, function($a, $b) {
                return filemtime($b) - filemtime($a);
            });
            $filename = basename($files[0]);
            return plugin_dir_url(__FILE__) . 'dist/assets/' . $filename;
        }
        
        return '';
    }

    /**
     * Enqueue compiled high-performance React bundle scripts and stylesheets
     */
    public function enqueue_listings_assets() {
        $js_url = $this->get_hashed_asset_url('js');
        $css_url = $this->get_hashed_asset_url('css');

        if ($js_url) {
            wp_register_script(
                'amx-listings-app-js', 
                $js_url, 
                array(), 
                '1.0.0', 
                true
            );

            // Filter script Tag attributes to support ES module loading natively inside WordPress
            add_filter('script_loader_tag', function($tag, $handle, $src) {
                if ('amx-listings-app-js' === $handle) {
                    return '<script type="module" src="' . esc_url($src) . '" id="amx-listings-app-js-js"></script>';
                }
                return $tag;
            }, 10, 3);
        }

        if ($css_url) {
            wp_register_style(
                'amx-listings-app-css', 
                $css_url, 
                array(), 
                '1.0.0'
            );
        }
    }

    /**
     * Render container element for client hydration and inject shortcode parameters into window scope
     */
    public function render_listings_portal($atts) {
        $args = shortcode_atts(array(
            'view'     => 'grid',
            'theme'    => 'light',
            'limit'    => '12',
            'featured' => 'no',
            'anchor'   => '#root' // Target mount point matching index.html
        ), $atts);

        // Enqueue the registered files ONLY when shortcode is active
        wp_enqueue_script('amx-listings-app-js');
        wp_enqueue_style('amx-listings-app-css');

        // Pass shortcode configuration array to JavaScript safely
        wp_localize_script('amx-listings-app-js', 'amxWpSettings', array(
            'defaultView'  => sanitize_text_field($args['view']),
            'themeMode'    => sanitize_text_field($args['theme']),
            'limit'        => intval($args['limit']),
            'featuredOnly' => sanitize_text_field($args['featured']) === 'yes',
            'wordpressMode'=> true
        ));

        // Return DOM hook
        return '<div id="' . esc_attr(trim($args['anchor'], '#')) . '"></div>';
    }
}

// Initialize the plugin
new AMX_Listings_Root_WordPress_Plugin();
