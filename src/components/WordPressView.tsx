import React, { useState, useEffect } from 'react';
import { FileCode, Terminal, Settings, Check, Copy, Download, ExternalLink, Code, Layers, Globe, Star, Info, X, Play, ArrowLeft, ArrowRight, UploadCloud, HelpCircle, RefreshCw, MapPin, Filter, SlidersHorizontal } from 'lucide-react';
import { PROPERTIES, AGENTS } from '../data';

export default function WordPressView() {
  // Config state for the interactive WordPress Shortcode builder
  const [defaultView, setDefaultView] = useState<'grid' | 'map'>('grid');
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'glass'>('light');
  const [limitCount, setLimitCount] = useState<number>(12);
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);
  const [targetContainerId, setTargetContainerId] = useState<string>('amx-listings-root');

  // Map sandbox states
  const [showOffPlan, setShowOffPlan] = useState<boolean>(true);
  const [showSecondary, setShowSecondary] = useState<boolean>(true);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [selectedPropertyPreview, setSelectedPropertyPreview] = useState<any | null>(null);

  // Helper code to categorize property asset type
  const getPropertyAssetType = (property: any) => {
    const offPlanIds = ['1', '3', '8', '10', '12', '14'];
    return offPlanIds.includes(property.id) ? 'Off-Plan' : 'Secondary Market';
  };

  // Onboarding Wizard states
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [guideStep, setGuideStep] = useState(1);
  const [zipSelected, setZipSelected] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pluginActivated, setPluginActivated] = useState(false);

  // Simulated zip upload progress trigger
  useEffect(() => {
    let interval: any;
    if (isUploading && uploadProgress < 100) {
      interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            setTimeout(() => {
              setUploadProgress(100);
              setIsUploading(false);
              setGuideStep(4);
            }, 600);
            return 95;
          }
          return prev + 15;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isUploading, uploadProgress]);

  // Copy-state triggers
  const [copiedShortcode, setCopiedShortcode] = useState(false);
  const [copiedPHP, setCopiedPHP] = useState(false);
  const [copiedJS, setCopiedJS] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'shortcode' | 'plugin' | 'theme'>('shortcode');

  // Dynamically constructed WordPress shortcode based on user parameters
  const generatedShortcode = `[amx_dubai_listings view="${defaultView}" theme="${themeMode}" limit="${limitCount}" featured="${featuredOnly ? 'yes' : 'no'}" anchor="#${targetContainerId}"]`;

  // Production-grade WordPress Plugin PHP source code that the user can copy
  const phpPluginCode = `<?php
/**
 * Plugin Name: AMX Dubai Luxury Real Estate Portal
 * Plugin URI: https://wordpress.org/plugins/amx-dubai-listings/
 * Description: Dynamically embeds the AMX high-performance reactive estate catalog with GIS maps.
 * Version: 1.0.0
 * Author: AMX Dubai Engineering
 * Author URI: https://amx.ae
 * License: GPL2
 */

// Prevent direct script access
if (!defined('ABSPATH')) {
    exit;
}

class AMX_Listings_WordPress_Plugin {
    
    public function __construct() {
        // Register shortcode
        add_shortcode('amx_dubai_listings', array($this, 'render_listings_portal'));
        // Load production enqueued assets
        add_action('wp_enqueue_scripts', array($this, 'enqueue_listings_assets'));
    }

    /**
     * Enqueue compiled high-performance React bundle scripts and stylesheets
     */
    public function enqueue_listings_assets() {
        // Enqueue Vite compile JS with ES Module compatibility
        wp_register_script(
            'amx-listings-app-js', 
            plugin_dir_url(__FILE__) . 'assets/app.js', 
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

        // Enqueue Tailwind & styling compiles
        wp_register_style(
            'amx-listings-app-css', 
            plugin_dir_url(__FILE__) . 'assets/app.css', 
            array(), 
            '1.0.0'
        );
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
            'anchor'   => '#amx-listings-root'
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
new AMX_Listings_WordPress_Plugin();`;

  // Custom JS integration snippet to read WP configurations during hydration
  const jsHydrationSnippet = `// In your React entry point (main.tsx/App.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Read localized WordPress configurations injected via PHP's wp_localize_script
const wpConfig = (window as any).amxWpSettings || {
  defaultView: 'grid',
  themeMode: 'light',
  limit: 12,
  featuredOnly: false,
};

const rootId = wpConfig.anchor ? wpConfig.anchor.replace('#', '') : 'root';
const rootElement = document.getElementById(rootId || 'root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App wpConfig={wpConfig} />
    </React.StrictMode>
  );
}`;

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-24 space-y-8 text-left font-sans">
      
      {/* Page Title Header */}
      <section className="py-8 border-b border-slate-200">
        <ul className="flex items-center gap-2 font-label text-[10px] uppercase tracking-widest text-slate-400 mb-4">
          <li>AMX Portal Developer Kit</li>
          <li>➔</li>
          <li className="text-[#041920] font-bold">WordPress Integration Suite</li>
        </ul>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#041920] font-black tracking-tight">
          WordPress Dynamic Adaptation Engine
        </h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2">
          <p className="text-xs text-slate-500 font-sans max-w-2xl leading-relaxed">
            Embed this complete, high-performance Dubai Luxury portal (with vectors maps and listing specs) inside your existing WordPress site. Use custom shortcodes, dynamic PHP plugins, and native assets.
          </p>
          <button
            onClick={() => {
              setGuideStep(1);
              setZipSelected(false);
              setIsUploading(false);
              setUploadProgress(0);
              setPluginActivated(false);
              setShowGuideModal(true);
            }}
            className="flex items-center justify-center gap-2 bg-[#755a24] hover:bg-[#041920] text-white px-5 py-2.5 rounded-xl font-label text-[10px] uppercase tracking-wider font-extrabold transition-all duration-300 shadow-md shrink-0 cursor-pointer hover:shadow-lg active:scale-95"
          >
            <Play className="h-3.5 w-3.5 fill-current text-[#ffdea7]" />
            Interactive Onboarding Walkthrough
          </button>
        </div>
      </section>

      {/* Grid: 2 Columns - HUD Settings and Code/Documentation Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: INTERACTIVE KNOBS & CONTROLS */}
        <div className="lg:col-span-4 bg-[#f5f3f3] p-6 rounded-2xl border border-[#c2c7ca] space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Settings className="h-5 w-5 text-[#755a24]" />
            <h3 className="font-serif text-base font-bold text-[#041920]">Shortcode Customizer</h3>
          </div>

          {/* Setting 1: Default View option */}
          <div className="space-y-2">
            <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-bold">
              Default Screen View
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDefaultView('grid')}
                className={`px-3 py-2 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer border ${
                  defaultView === 'grid'
                    ? 'bg-[#041920] text-amber-100 border-[#041920]'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setDefaultView('map')}
                className={`px-3 py-2 rounded-lg text-xs font-bold font-sans transition-all cursor-pointer border ${
                  defaultView === 'map'
                    ? 'bg-[#041920] text-amber-100 border-[#041920]'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Interactive Map
              </button>
            </div>
            <p className="text-[10px] text-slate-400 font-sans leading-normal">
              Determines which interactive visual mode WordPress readers see on load.
            </p>
          </div>

          {/* Setting 2: Theme override */}
          <div className="space-y-2">
            <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-bold">
              Theme Overlay Mode
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['light', 'dark', 'glass'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setThemeMode(t)}
                  className={`px-2 py-1.5 rounded-lg text-[10px] uppercase font-label tracking-wider font-bold transition-all cursor-pointer border ${
                    themeMode === t
                      ? 'bg-[#041920] text-white border-[#041920]'
                      : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 font-sans leading-normal">
              Adapts headers, borders, and card colors to match your WordPress theme's visual tone.
            </p>
          </div>

          {/* Setting 3: Listing fetch limit */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest font-bold">
                Max Units Displayed
              </label>
              <span className="text-xs font-mono font-bold text-[#755a24]">{limitCount} properties</span>
            </div>
            <input
              type="range"
              min="3"
              max="24"
              step="3"
              value={limitCount}
              onChange={(e) => setLimitCount(parseInt(e.target.value))}
              className="w-full accent-[#755a24] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Setting 4: Toggles */}
          <div className="space-y-2.5 pt-1">
            <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-semibold mb-2">
              Behavior Triggers
            </label>
            
            <label className="flex items-center gap-2.5 text-xs text-slate-600 select-none cursor-pointer hover:text-slate-900 leading-normal">
              <input
                type="checkbox"
                checked={featuredOnly}
                onChange={(e) => setFeaturedOnly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-350 text-[#755a24] focus:ring-0"
              />
              <span className="font-sans">Only Display Premium Exclusive Portfolio</span>
            </label>
          </div>

          {/* Setting 5: Mount Anchor Div Hook ID */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-label text-slate-500 uppercase tracking-widest block font-bold">
              Target Element Anchor ID
            </label>
            <input
              type="text"
              value={targetContainerId}
              onChange={(e) => setTargetContainerId(e.target.value.replace(/\s+/g, '-'))}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#755a24] text-slate-700 font-mono"
            />
            <p className="text-[10px] text-slate-400 font-sans leading-snug">
              Matches the HTML `id` attribute WordPress enqueuer loads React inside.
            </p>
          </div>

          {/* Copy shortcode instant feedback HUD */}
          <div className="bg-[#041920] text-white p-4 rounded-xl space-y-3.5 border border-[#364a51] shadow-md">
            <div>
              <span className="text-[8px] uppercase font-label tracking-widest text-[#ffdea7] block mb-0.5">
                GENERATED WORDPRESS SHORTCODE
              </span>
              <p className="text-xs font-mono select-all bg-black/40 p-2.5 rounded-lg border border-white/5 break-all text-[#ffdea7]">
                {generatedShortcode}
              </p>
            </div>
            
            <button
              onClick={() => copyToClipboard(generatedShortcode, setCopiedShortcode)}
              className="w-full bg-[#ffdea7] hover:bg-white text-[#041920] py-2 rounded-lg font-label text-[10px] uppercase tracking-wider font-extrabold flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
            >
              {copiedShortcode ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Checked &amp; Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy Shortcode
                </>
              )}
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: DETAILED CODE AND GUIDES CONSOLE */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Sub Tab Navigation */}
          <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveSubTab('shortcode')}
              className={`flex items-center gap-1.5 px-4 py-3 border-b-2 text-xs font-label uppercase tracking-wider font-extrabold whitespace-nowrap transition-colors cursor-pointer ${
                activeSubTab === 'shortcode'
                  ? 'border-[#755a24] text-[#041920]'
                  : 'border-transparent text-slate-400 hover:text-[#041920]'
              }`}
            >
              <Code className="h-4 w-4" />
              1. Deployment Blueprint
            </button>
            <button
              onClick={() => setActiveSubTab('plugin')}
              className={`flex items-center gap-1.5 px-4 py-3 border-b-2 text-xs font-label uppercase tracking-wider font-extrabold whitespace-nowrap transition-colors cursor-pointer ${
                activeSubTab === 'plugin'
                  ? 'border-[#755a24] text-[#041920]'
                  : 'border-transparent text-slate-400 hover:text-[#041920]'
              }`}
            >
              <FileCode className="h-4 w-4" />
              2. Custom WP Wrapper Plugin (PHP)
            </button>
            <button
              onClick={() => setActiveSubTab('theme')}
              className={`flex items-center gap-1.5 px-4 py-3 border-b-2 text-xs font-label uppercase tracking-wider font-extrabold whitespace-nowrap transition-colors cursor-pointer ${
                activeSubTab === 'theme'
                  ? 'border-[#755a24] text-[#041920]'
                  : 'border-transparent text-slate-400 hover:text-[#041920]'
              }`}
            >
              <Layers className="h-4 w-4" />
              3. Client Hydration Hook (JS)
            </button>
          </div>

          {/* Sub Tab 1: Configuration Guidelines & Steps */}
          {activeSubTab === 'shortcode' && (
            <div className="space-y-6 animate-fade-in-up">
              
              <div className="bg-[#ffdea7]/10 border border-[#ffdea7]/40 p-5 rounded-2xl flex items-start gap-4">
                <Info className="h-5 w-5 text-[#755a24] shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <h4 className="font-serif font-black text-[#041920]">WordPress Ready-to-Serve Architecture</h4>
                  <p className="text-slate-600 leading-relaxed">
                    By default, WordPress sites run on traditional server architectures (PHP). This implementation acts as a headless high-performance client script. We compile your React bundle down to a single compact JS entry point + one CSS file. These load dynamically inside WordPress shortcodes, and boot up without modifying the WordPress templates database.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-lg font-black text-[#041920]">Three Simple Steps to Run on WordPress</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
                  
                  <div className="bg-white border border-[#E8E4DE] p-5 rounded-xl space-y-2.5 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="w-6 h-6 rounded-full bg-[#041920] text-[#ffdea7] flex items-center justify-center font-bold text-xs mb-2">
                        1
                      </span>
                      <h4 className="font-bold text-[#041920]">Create WP Plugin</h4>
                      <p className="text-slate-500 leading-relaxed text-xs">
                        Copy the custom PHP wrapper in the next tab to a text file named <code className="font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded text-[#755a24]">amx-listings.php</code>. Zip it up and upload to WordPress under <strong className="text-slate-800">Plugins ➔ Add New</strong>.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setGuideStep(1);
                        setZipSelected(false);
                        setIsUploading(false);
                        setUploadProgress(0);
                        setPluginActivated(false);
                        setShowGuideModal(true);
                      }}
                      className="text-[#755a24] hover:text-[#041920] hover:underline font-label text-[10px] uppercase font-bold tracking-wider inline-flex items-center gap-1 cursor-pointer pt-2 mt-auto text-left"
                    >
                      🎓 View Walkthrough Simulation ➔
                    </button>
                  </div>

                  <div className="bg-white border border-[#E8E4DE] p-5 rounded-xl space-y-2 shadow-sm">
                    <span className="w-6 h-6 rounded-full bg-[#041920] text-[#ffdea7] flex items-center justify-center font-bold text-xs">
                      2
                    </span>
                    <h4 className="font-bold text-[#041920]">Upload Assets</h4>
                    <p className="text-slate-500 leading-relaxed">
                      Run <code className="font-mono text-[10px] bg-slate-100 px-1 py-0.5 rounded text-[#755a24]">npm run build</code> in this workspace. Upload the produced bundle script files to your plugin's <code className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-amber-900">/assets/</code> folder.
                    </p>
                  </div>

                  <div className="bg-white border border-[#E8E4DE] p-5 rounded-xl space-y-2 shadow-sm">
                    <span className="w-6 h-6 rounded-full bg-[#041920] text-[#ffdea7] flex items-center justify-center font-bold text-xs">
                      3
                    </span>
                    <h4 className="font-bold text-[#041920]">Place Shortcode</h4>
                    <p className="text-slate-500 leading-relaxed">
                      Paste the dynamic custom shortcode widget <code className="font-mono text-[10.5px] text-[#755a24] bg-amber-50 px-1 rounded">{`[amx_dubai_listings]`}</code> on any WordPress page, Gutenberg widget block, or Elementor rich column.
                    </p>
                  </div>

                </div>
              </div>

              {/* Advanced benefits visual bar */}
              <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-white shadow-sm">
                <h4 className="font-serif font-black text-xs uppercase tracking-wider text-[#041920] text-left">
                  Performance &amp; SEO Optimization Advantages
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-500 leading-relaxed">
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#755a24]/10 text-[#755a24] flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">✔</div>
                    <p><strong className="text-slate-700">Zero Query Overhead:</strong> Content retrieves client-side, avoiding slow PHP SQL lookup and WordPress WP_Query delays.</p>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#755a24]/10 text-[#755a24] flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">✔</div>
                    <p><strong className="text-slate-700">Gutenberg &amp; Elementor Out-of-the-Box:</strong> Seamless placement inside container blocks without messing up core grid styles.</p>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#755a24]/10 text-[#755a24] flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">✔</div>
                    <p><strong className="text-slate-700">Responsive Vector Grids:</strong> The Dubai GPS Vector Map shifts gracefully to mobile aspect ratios on all WordPress layouts.</p>
                  </div>
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#755a24]/10 text-[#755a24] flex items-center justify-center text-[9px] shrink-0 font-bold mt-0.5">✔</div>
                    <p><strong className="text-slate-700">RERA Compliance Guarded:</strong> Real-time regulatory data caches directly, avoiding stale database states on server pages.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Sub Tab 2: Code block of PHP Plugin */}
          {activeSubTab === 'plugin' && (
            <div className="space-y-4 animate-fade-in-up">
              <div className="flex justify-between items-center bg-[#f5f3f3] p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-mono text-slate-500">amx-dubai-listings.php</span>
                
                <button
                  onClick={() => copyToClipboard(phpPluginCode, setCopiedPHP)}
                  className="bg-[#041920] hover:bg-[#1a2e35] text-white px-3.5 py-2 rounded-lg font-label text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedPHP ? <Check className="h-3.5 w-3.5 text-[#ffdea7]" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedPHP ? 'Copied' : 'Copy Plugin Code'}
                </button>
              </div>

              <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-[#0b1b21] max-h-[460px] overflow-y-auto shadow-inner">
                <pre className="p-4 text-[11px] font-mono text-slate-100 overflow-x-auto leading-relaxed select-all">
                  <code>{phpPluginCode}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Sub Tab 3: Client Hydration configuration for WordPress */}
          {activeSubTab === 'theme' && (
            <div className="space-y-4 animate-fade-in-up">
              <div className="bg-amber-100/15 border border-[#ffdea7]/30 p-4 rounded-xl flex items-start gap-3 text-xs leading-normal">
                <Info className="h-4 w-4 text-[#755a24] mt-0.5 shrink-0" />
                <p className="text-slate-600">
                  <strong>Client-Side Hydration:</strong> To ensure WordPress can customize defaults (like launching directly into the Interactive Dubai Map rather than Listings Grid), the JS entry point extracts the localized data bundle on viewport initialization. Update your React initialization routine to read settings dynamically:
                </p>
              </div>

              <div className="flex justify-between items-center bg-[#f5f3f3] p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] font-mono text-slate-500">src/main.tsx Update</span>
                
                <button
                  onClick={() => copyToClipboard(jsHydrationSnippet, setCopiedJS)}
                  className="bg-[#041920] hover:bg-[#1a2e35] text-[#ffdea7] px-3.5 py-2 rounded-lg font-label text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedJS ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedJS ? 'Copied Snippet' : 'Copy JavaScript Hook'}
                </button>
              </div>

              <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-[#0b1b21] max-h-[460px] overflow-y-auto shadow-inner text-left">
                <pre className="p-4 text-[11px] font-mono text-slate-100 overflow-x-auto leading-relaxed select-all">
                  <code>{jsHydrationSnippet}</code>
                </pre>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Dynamic Sandbox Simulator */}
      <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md space-y-0 mt-8 animate-fade-in-up">
        {/* Banner header to introduce sandbox */}
        <div className="bg-gradient-to-r from-[#041920] to-[#12303c] p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <div className="flex items-center gap-2">
              <span className="bg-[#755a24] text-[#ffdea7] text-[9.5px] px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold font-mono">
                Live Shortcode Sandbox
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <h3 className="font-serif text-2xl font-black text-[#ffdea7] tracking-tight">
              Headless Client Live Execution Renderer
            </h3>
            <p className="text-xs text-[#81969e] max-w-xl leading-relaxed">
              Below is a high-fidelity simulation of how the compiled React shortcode renders inside your simulated WordPress target container <code className="bg-black/20 text-white/90 px-1 py-0.5 rounded font-mono text-[10px] border border-white/5 font-bold">#{targetContainerId}</code>.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0 select-none">
            <div className="bg-white/10 border border-white/10 rounded-xl p-3 text-left">
              <div className="text-[8px] text-[#ffdea7] font-mono tracking-wider uppercase leading-none mb-1">EXECUTION ROUTINE</div>
              <div className="text-[10px] font-mono text-emerald-300 font-semibold leading-none truncate max-w-[200px]">{`[amx_dubai_listings view="${defaultView}"...]`}</div>
            </div>
          </div>
        </div>

        {/* Content area based on view style: Map View vs Grid View */}
        <div className="p-6 bg-slate-50 border-t border-slate-100">
          {defaultView === 'map' ? (
            /* INTERACTIVE DUBAI MAP PREVIEW */
            <div className={`relative rounded-2xl overflow-hidden border transition-all duration-500 shadow-inner h-[550px] ${
              themeMode === 'dark' 
                ? 'bg-[#041920] border-slate-800 text-white' 
                : themeMode === 'glass' 
                  ? 'bg-slate-900/95 backdrop-blur-md border-white/10 text-white' 
                  : 'bg-[#f4f2ee] border-slate-200 text-slate-800'
            }`}>
              
              {/* Radar Grid outlines for map vibe */}
              <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
                <div className={`h-full w-full grid grid-cols-12 grid-rows-12 border ${themeMode === 'light' ? 'border-amber-950/10' : 'border-white/10'}`}>
                  {Array.from({ length: 144 }).map((_, idx) => (
                    <div key={idx} className={`border-r border-b ${themeMode === 'light' ? 'border-amber-950/5' : 'border-white/5'}`} />
                  ))}
                </div>
              </div>

              {/* Coastal Palm Jumeirah & Map Contour Art */}
              <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full border border-dashed border-amber-500/20 flex items-center justify-center animate-[spin_60s_linear_infinite] pointer-events-none select-none">
                <div className="w-[200px] h-[200px] rounded-full border border-amber-500/10 flex items-center justify-center">
                  <span className="text-[8px] text-amber-500/20 font-bold uppercase tracking-widest font-mono">ARABIAN GULF WATERWAY</span>
                </div>
              </div>
              <div className={`absolute top-1/3 left-0 right-0 h-4 ${themeMode === 'light' ? 'bg-[#ffdea7]/40' : 'bg-[#755a24]/10'} transform rotate-2 pointer-events-none`}></div>

              {/* FLOATING FILTER PANEL OVERLAY WITH TRANSPARENCY, BLUR AND GORGEOUS CONTROLS */}
              <div className={`absolute top-4 right-4 z-30 w-72 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 font-sans ${
                themeMode === 'light'
                  ? 'bg-white/95 border-slate-250 text-slate-800 shadow-slate-200/55'
                  : 'bg-[#041920]/95 border-slate-800 text-white shadow-black/45'
              }`}>
                <div className="flex items-center justify-between border-b pb-2.5 mb-3 border-slate-200/20">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-[#755a24]" />
                    <span className="font-serif text-sm font-black tracking-tight">AMX GPS Layer Customizer</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 block animate-pulse"></span>
                </div>
                
                <p className="text-[10px] text-slate-450 leading-normal mb-3 text-left">
                  Configure real-time shortcode render parameters to toggle active GPS layers immediately in your browser preview container.
                </p>

                <div className="grid grid-cols-1 gap-2">
                  {/* Off-Plan Toggle Button */}
                  <button
                    onClick={() => setShowOffPlan(!showOffPlan)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border transition-all duration-200 hover:scale-[1.01] text-left cursor-pointer ${
                      showOffPlan
                        ? themeMode === 'light'
                          ? 'bg-amber-50/70 border-[#755a24] text-[#755a24]'
                          : 'bg-[#755a24]/20 border-[#755a24] text-[#ffdea7]'
                        : themeMode === 'light'
                          ? 'bg-slate-50 border-slate-200 text-slate-400'
                          : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${showOffPlan ? 'bg-amber-500 animate-pulse' : 'bg-slate-400'}`}></span>
                      <div className="text-[10.5px]">
                        <div className="font-bold uppercase tracking-wider leading-none">Off-Plan Projects</div>
                        <div className="text-[8px] opacity-70 mt-0.5 font-sans">Under construction projects</div>
                      </div>
                    </div>
                    <span className="bg-black/10 text-[9px] px-1.5 py-0.5 rounded font-mono font-bold text-slate-405">
                      {PROPERTIES.filter(p => getPropertyAssetType(p) === 'Off-Plan').slice(0, limitCount).length}
                    </span>
                  </button>

                  {/* Secondary Market Toggle Button */}
                  <button
                    onClick={() => setShowSecondary(!showSecondary)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border transition-all duration-200 hover:scale-[1.01] text-left cursor-pointer ${
                      showSecondary
                        ? themeMode === 'light'
                          ? 'bg-sky-50/70 border-[#2271b1] text-[#2271b1]'
                          : 'bg-[#2271b1]/15 border-[#2271b1] text-emerald-350'
                        : themeMode === 'light'
                          ? 'bg-slate-50 border-slate-200 text-slate-400'
                          : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${showSecondary ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`}></span>
                      <div className="text-[10.5px]">
                        <div className="font-bold uppercase tracking-wider leading-none">Secondary Market</div>
                        <div className="text-[8px] opacity-70 mt-0.5 font-sans font-medium">Ready properties portfolios</div>
                      </div>
                    </div>
                    <span className="bg-black/10 text-[9px] px-1.5 py-0.5 rounded font-mono font-bold text-slate-405">
                      {PROPERTIES.filter(p => getPropertyAssetType(p) === 'Secondary Market').slice(0, limitCount).length}
                    </span>
                  </button>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200/10 flex justify-between text-[8px] font-mono text-slate-400">
                  <span>GPS SYSTEM STATE</span>
                  <span className={showOffPlan || showSecondary ? "text-emerald-400 font-bold" : "text-amber-500 font-bold"}>
                    {showOffPlan && showSecondary ? "DUAL CHANNEL ACTIVE" : (showOffPlan || showSecondary) ? "SINGLE LAYER ON" : "ALL VISUALS FILTERED"}
                  </span>
                </div>
              </div>

              {/* Map Coordinates and Property Pins */}
              <div className="relative w-full h-[400px] flex items-center justify-center mt-20">
                
                {/* Simulated center coordinate grid target */}
                <div className={`absolute w-72 h-72 rounded-full border border-dashed flex items-center justify-center animate-pulse pointer-events-none ${
                  themeMode === 'light' ? 'border-amber-950/10' : 'border-white/10'
                }`}>
                  <span className={`text-[8px] uppercase tracking-widest font-mono opacity-50 ${themeMode === 'light' ? 'text-amber-950' : 'text-amber-100'}`}>
                    Active GIS Focus Zone
                  </span>
                </div>

                {PROPERTIES.slice(0, limitCount)
                  .filter(p => !featuredOnly || p.featured)
                  .map((prop, idx) => {
                    const assetType = getPropertyAssetType(prop);
                    
                    // Filter logic
                    const isVisible = (assetType === 'Off-Plan' && showOffPlan) || 
                                      (assetType === 'Secondary Market' && showSecondary);
                    
                    if (!isVisible) return null;

                    // Coordinates offset representation
                    const offsets = [
                      { t: '15%', l: '35%' },
                      { t: '55%', l: '65%' },
                      { t: '40%', l: '15%' },
                      { t: '75%', l: '45%' },
                      { t: '50%', l: '85%' },
                      { t: '25%', l: '70%' },
                      { t: '58%', l: '28%' },
                      { t: '32%', l: '48%' },
                      { t: '65%', l: '78%' },
                      { t: '18%', l: '58%' },
                      { t: '45%', l: '38%' },
                      { t: '72%', l: '18%' }
                    ];
                    const pos = offsets[idx % offsets.length];

                    // Styling parameters depending on whether it is Off-Plan or Secondary Market
                    const isOffPlan = assetType === 'Off-Plan';
                    const activeColor = isOffPlan ? '#755a24' : '#2271b1';

                    return (
                      <div
                        key={prop.id}
                        onMouseEnter={() => setHoveredPropertyId(prop.id)}
                        onMouseLeave={() => setHoveredPropertyId(null)}
                        onClick={() => setSelectedPropertyPreview(prop)}
                        className="absolute group flex items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 z-20"
                        style={{ top: pos.t, left: pos.l }}
                      >
                        {/* Custom shaped map pin */}
                        <div 
                          className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg relative transition-all duration-300"
                          style={{ 
                            backgroundColor: hoveredPropertyId === prop.id ? activeColor : '#041920',
                            border: `2.5px solid ${isOffPlan ? '#ffdea7' : '#2271b1'}`,
                          }}
                        >
                          <MapPin className="h-2.5 w-2.5 text-white fill-current" />
                          
                          {/* Animated radar rings surrounding off-plan structures */}
                          {isOffPlan && (
                            <span className="absolute -inset-1 rounded-full border border-amber-400/50 animate-ping opacity-30"></span>
                          )}
                        </div>

                        {/* Floating mini status tag always visible */}
                        <div className={`p-1 px-1.5 rounded-md border text-[8px] font-mono font-bold leading-none shadow-md ${
                          themeMode === 'light' 
                            ? 'bg-white border-slate-200 text-slate-800' 
                            : 'bg-[#041920] border-slate-700 text-white'
                        }`}>
                          {isOffPlan ? 'Off-Plan' : 'Ready'}
                        </div>

                        {/* HOVER TOOLTIP ELEMENT */}
                        {hoveredPropertyId === prop.id && (
                          <div className={`absolute top-8 -left-16 z-45 p-2.5 rounded-xl border text-[10px] w-48 shadow-2xl transition-all duration-300 ${
                            themeMode === 'light'
                              ? 'bg-white border-slate-200 text-slate-800 shadow-slate-300/40'
                              : 'bg-[#041920]/95 border-slate-800 text-white shadow-black/40'
                          }`}>
                            <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-1.5 bg-slate-200">
                              <img src={prop.image} alt={prop.title} className="w-full h-full object-cover" />
                              <span className={`absolute top-1 left-1 text-[7px] font-semibold uppercase px-1.5 py-0.5 rounded-full ${
                                isOffPlan ? 'bg-[#755a24]/90 text-[#ffdea7]' : 'bg-emerald-600/90 text-white'
                              }`}>
                                {assetType}
                              </span>
                            </div>
                            <h5 className="font-serif font-black truncate leading-tight">{prop.title}</h5>
                            <p className="text-[#755a24] font-bold font-mono text-[9px] mt-0.5">AED {prop.price.toLocaleString()}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}

                {/* All Filtered Out Warning Fallback inside map */}
                {(!showOffPlan && !showSecondary) && (
                  <div className={`absolute text-center p-6 rounded-2xl max-w-sm border z-40 animate-fade-in-up ${
                    themeMode === 'light' 
                      ? 'bg-white/90 border-slate-200 text-slate-700' 
                      : 'bg-[#041920]/95 border-white/10 text-[#81969e]'
                  }`}>
                    <SlidersHorizontal className="h-8 w-8 text-[#755a24] mx-auto mb-2 animate-bounce" />
                    <h5 className="font-serif font-extrabold text-sm mb-1">GIS Satellite Stream Interrupted</h5>
                    <p className="text-[10.5px] leading-relaxed">
                      All visible layers are currently toggled off. Tap the controller options in the floating controller dashboard above to restore GPS rendering.
                    </p>
                  </div>
                )}
              </div>

              {/* SELECTED PROPERTY PREVIEW FOOTER DRAWER OVER THE MAP */}
              {selectedPropertyPreview && (
                <div className={`absolute bottom-4 left-4 right-4 z-30 p-4 rounded-xl border flex items-center justify-between gap-4 animate-fade-in-up md:max-w-xl ${
                  themeMode === 'light'
                    ? 'bg-white/95 border-slate-200 text-slate-800 shadow-xl shadow-slate-200/40'
                    : 'bg-[#041920]/95 border-white/10 text-white shadow-2xl'
                }`}>
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img 
                      src={selectedPropertyPreview.image} 
                      alt={selectedPropertyPreview.title} 
                      className="w-14 h-14 rounded-lg object-cover bg-slate-200 shrink-0 border border-slate-300/25" 
                    />
                    <div className="text-left overflow-hidden font-sans">
                      <span className={`text-[8px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full inline-block mb-1 ${
                        getPropertyAssetType(selectedPropertyPreview) === 'Off-Plan'
                          ? 'bg-[#755a24]/10 text-[#755a24] border border-[#755a24]/20'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {getPropertyAssetType(selectedPropertyPreview)} Category
                      </span>
                      <h4 className="font-serif text-sm font-black truncate leading-tight">{selectedPropertyPreview.title}</h4>
                      <p className="text-[#755a24] text-[10.5px] font-mono font-bold mt-0.5">AED {selectedPropertyPreview.price.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 font-sans">
                    <span className="text-[9px] uppercase font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                      Inspect Mode Active
                    </span>
                    <button
                      onClick={() => setSelectedPropertyPreview(null)}
                      className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Status footer bar */}
              <div className="absolute bottom-4 right-4 z-20 text-[9px] font-mono opacity-50">
                Lat/Lon Spatial Grid: 25.2048° N, 55.2708° E
              </div>
            </div>
          ) : (
            /* DYNAMIC LUXURY LISTINGS GRID PREVIEW (when defaultView === 'grid') */
            <div className="space-y-6">
              <div className="flex justify-between items-center text-xs font-sans text-slate-500">
                <p>Simulating grid representation limits fetched via localized database hook.</p>
                <p className="font-bold text-[#755a24] font-mono uppercase tracking-widest">{limitCount} units rendered</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PROPERTIES.slice(0, Math.min(6, limitCount))
                  .filter(p => !featuredOnly || p.featured)
                  .map((prop) => {
                    const isOffPlan = getPropertyAssetType(prop) === 'Off-Plan';

                    return (
                      <div 
                        key={prop.id} 
                        className={`bg-white rounded-xl overflow-hidden border border-[#E8E4DE] shadow-sm relative group`}
                      >
                        <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
                          <img src={prop.image} alt={prop.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                          <span className={`absolute top-3 left-3 text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full ${
                            isOffPlan ? 'bg-[#755a24] text-[#ffdea7]' : 'bg-[#041920] text-emerald-100'
                          }`}>
                            {getPropertyAssetType(prop)}
                          </span>
                        </div>
                        <div className="p-4 text-left">
                          <h4 className="font-serif font-black text-sm text-[#041920] truncate">{prop.title}</h4>
                          <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-slate-100">
                            <span className="font-sans text-[11px] text-slate-400">{prop.type} • {prop.location}</span>
                            <span className="font-mono font-bold text-xs text-[#755a24]">AED {prop.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {PROPERTIES.filter(p => !featuredOnly || p.featured).length === 0 && (
                <div className="bg-white p-12 text-center border rounded-xl font-sans space-y-2">
                  <SlidersHorizontal className="h-6 w-6 text-slate-350 mx-auto" />
                  <p className="font-bold text-slate-600">No properties available with active parameters.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Simulated WordPress Upload Walkthrough Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#041920]/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[750px] md:h-[620px] animate-fade-in-up relative">
            
            {/* CLOSE BUTTON OVERLAY FOR MOBILE COMPATIBILITY */}
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-150/80 hover:bg-slate-200 text-slate-800 md:hidden cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* MODAL LEFT BAR: PROGRESS WATCH & SUMMARY */}
            <div className="md:w-1/3 bg-[#041920] text-white p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 select-none shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-[#755a24] text-[#ffdea7] text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider font-extrabold font-mono">
                    Interactive Guide
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                
                <h3 className="font-serif text-2xl font-black text-[#ffdea7] tracking-tight leading-snug">
                  WordPress Dashboard Installation
                </h3>
                <p className="text-[11px] text-[#81969e] mt-1.5 leading-relaxed font-sans">
                  Play with our high-fidelity, interactive WordPress panel simulator to master hosting the luxurious AMX portal directly within your CMS workspace.
                </p>

                {/* Stepper progress indicator */}
                <div className="space-y-3 mt-6">
                  {[
                    { s: 1, title: 'Plugins Navigation', desc: 'Open simulated WordPress Plugins folder.' },
                    { s: 2, title: 'Upload Canvas', desc: 'Activate local archive drag drawer.' },
                    { s: 3, title: 'ZIP Extraction', desc: 'Extract and transfer codebase specs.' },
                    { s: 4, title: 'Activation', desc: 'Hydrate reactive luxury dashboards.' }
                  ].map((st) => (
                    <div 
                      key={st.s}
                      onClick={() => {
                        setGuideStep(st.s);
                      }}
                      className={`flex items-start gap-3 p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        guideStep === st.s
                          ? 'bg-white/10 border-white/20 text-[#ffdea7]'
                          : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        guideStep === st.s
                          ? 'bg-[#755a24] text-[#ffdea7]'
                          : guideStep > st.s 
                            ? 'bg-emerald-500 text-slate-900' 
                            : 'bg-white/5 text-slate-450'
                      }`}>
                        {guideStep > st.s ? '✓' : st.s}
                      </span>
                      <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-wider leading-none mt-0.5">{st.title}</h5>
                        <p className="text-[8.5px] opacity-70 leading-snug mt-1">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
                <div className="text-[9px] text-[#81969e] flex justify-between uppercase tracking-wider font-mono">
                  <span>Simulated Status:</span>
                  <span className={pluginActivated ? "text-emerald-400 font-extrabold" : isUploading ? "text-[#ffdea7]" : "text-amber-200"}>
                    {pluginActivated ? 'ACTIVE & ONLINE' : isUploading ? `LOADING (${uploadProgress}%)` : 'WAITING ACTION'}
                  </span>
                </div>
                
                <button
                  onClick={() => setShowGuideModal(false)}
                  className="w-full bg-[#ffdea7] hover:bg-white text-[#041920] rounded-xl py-2.5 font-label text-[10px] uppercase tracking-wider font-extrabold transition-all cursor-pointer text-center duration-300 active:scale-95"
                >
                  Close Tutorial System
                </button>
              </div>
            </div>

            {/* MODAL RIGHT WORKSPACE: LIVE INTERACTIVE WORDPRESS SCREEN SIMULATION */}
            <div className="flex-1 bg-[#f0f2f5] p-5 flex flex-col justify-between relative overflow-hidden font-sans">
              
              {/* SYSTEM HEADER BAR */}
              <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between select-none shrink-0 mb-4">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 block shrink-0"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 block shrink-0"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 block shrink-0"></span>
                  <span className="text-[10px] font-mono text-slate-400 ml-1 select-none truncate">
                    https://amx-luxury.wp/wp-admin/plugin-install.php?tab=upload
                  </span>
                </div>
                <button 
                  onClick={() => setShowGuideModal(false)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer hidden md:block"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* SIMULATED WORDPRESS ADMINISTRATION VIEW */}
              <div className="flex-grow bg-[#f0f2f5] rounded-xl flex border border-slate-200 overflow-hidden relative">
                
                {/* WORDPRESS DEEP GREY LEFT SIDEBAR */}
                <div className="w-36 bg-[#1d2327] text-slate-200 p-2 flex flex-col justify-between select-none text-[9px] tracking-wide shrink-0 font-sans border-r border-[#101416]">
                  <div className="space-y-1">
                    <div className="p-1 px-1.5 opacity-50 font-bold text-slate-400 text-[7.5px] tracking-widest uppercase border-b border-white/5 mb-1.5">
                      WordPress Admin
                    </div>
                    {[
                      { n: 'Dashboard', icon: '📁' },
                      { n: 'Posts', icon: '📝' },
                      { n: 'Media', icon: '🖼️' },
                      { n: 'Pages', icon: '📄' },
                      { n: 'Plugins', icon: '🔌', active: true },
                      { n: 'Appearance', icon: '🖌️' },
                      { n: 'Users', icon: '👤' },
                      { n: 'Tools', icon: '🛠️' },
                      { n: 'Settings', icon: '⚙️' }
                    ].map((item) => (
                      <div key={item.n}>
                        <div className={`p-1.5 rounded flex items-center gap-2 cursor-pointer font-sans transition-all leading-tight ${
                          item.active ? 'bg-[#2271b1] text-white font-extrabold' : 'hover:bg-white/5 text-slate-300'
                        }`}>
                          <span className="text-[11px]">{item.icon}</span>
                          <span>{item.n}</span>
                        </div>
                        {item.active && (
                          <div className="pl-4 mt-1 space-y-1 text-[8px] border-l border-[#2271b1]/30 ml-2">
                            <div className="p-0.5 text-slate-400 hover:text-white cursor-pointer">Installed</div>
                            <div className={`p-1 rounded font-bold transition-all duration-300 ${guideStep === 1 ? 'text-[#ffdea7] bg-white/10 font-extrabold relative' : 'text-slate-200'}`}>
                              Add New Plugin
                              {guideStep === 1 && (
                                <span className="absolute right-1 top-1.5 w-1 h-1 bg-amber-400 rounded-full animate-ping"></span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-1 px-1.5 text-[7.5px] text-slate-500 font-mono">
                    WordPress 6.5 LTS
                  </div>
                </div>

                {/* WORDPRESS MAIN SCREEN PANEL */}
                <div className="flex-1 bg-white p-4 md:p-5 flex flex-col justify-between overflow-y-auto">
                  
                  {/* STEP 1 CLIENT SCREEN CONTENT */}
                  {guideStep === 1 && (
                    <div className="space-y-4 text-left animate-fade-in-up flex-grow flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <span className="text-[8px] uppercase font-bold tracking-widest text-[#755a24] bg-amber-100 text-[#755a24] px-2 py-0.5 rounded-full inline-block">
                          Primary Phase
                        </span>
                        <h4 className="font-serif text-lg font-black text-[#041920]">Navigate into the Action Hub</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                          To integrate the premium AMX properties system, we must access the WordPress custom installation folder. Click <strong className="text-slate-800">Add New Plugin</strong> inside the sidebar sidebar tree, or trigger the simulation below to open the upload drawer.
                        </p>
                      </div>

                      {/* Interactive click simulation center */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center space-y-3 relative overflow-hidden flex-grow flex flex-col justify-center items-center my-4">
                        <div className="absolute top-2 right-2 flex items-center gap-1.5 text-[8.5px] hover:text-slate-500 font-mono text-slate-400">
                          <span>Live Demo Environment</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                        </div>

                        <p className="text-[11px] text-slate-600 font-sans max-w-sm">
                          Hover and activate the cursor trigger to enter the enqueuer drawer interface:
                        </p>

                        <button
                          type="button"
                          onClick={() => setGuideStep(2)}
                          className="bg-[#2271b1] hover:bg-[#135e96] text-white px-5 py-2.5 rounded text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer relative group flex items-center gap-1.5"
                        >
                          <span>Simulate Sidemenu Click</span>
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffdea7] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                          </span>
                        </button>
                      </div>

                      <div className="text-[9.5px] text-slate-400 font-sans text-center">
                        Pro-tip: All custom asset loads are enqueued synchronously to avoid template bottlenecks.
                      </div>
                    </div>
                  )}

                  {/* STEP 2 CLIENT SCREEN CONTENT */}
                  {guideStep === 2 && (
                    <div className="space-y-4 text-left animate-fade-in-up flex-grow flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <span className="text-[8px] uppercase font-bold tracking-widest text-[#755a24] bg-amber-100 text-[#755a24] px-2 py-0.5 rounded-full inline-block">
                          Step 2 of 4
                        </span>
                        <h4 className="font-serif text-lg font-black text-[#041920]">Launch the Archive Installer</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                          WordPress provides an embedded installer for certified third-party zip files. Toggle the top-level <strong className="bg-[#2271b1]/10 text-[#2271b1] px-1 rounded font-bold">Upload Plugin</strong> action to unfold the drag-drop drawer.
                        </p>
                      </div>

                      {/* Simulated header frame */}
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 my-3 flex-grow flex flex-col justify-center">
                        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                          <h4 className="text-xs font-sans font-black uppercase text-slate-700 tracking-wider">Add Plugins Workspace</h4>
                          
                          {/* Pulsing button to click */}
                          <button
                            type="button"
                            onClick={() => setGuideStep(3)}
                            className="bg-white hover:bg-[#2271b1] hover:text-white text-[#1d2327] px-4 py-2 rounded text-[10.5px] font-extrabold transition-all border border-slate-300 shadow-sm flex items-center gap-2 cursor-pointer active:scale-95 duration-200 relative"
                          >
                            <UploadCloud className="h-3.5 w-3.5" />
                            Upload Plugin
                            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                          </button>
                        </div>

                        <div className="py-2 text-center text-slate-400">
                          <p className="text-[10px]"> Curated repository plugins list below implicitly...</p>
                          <div className="grid grid-cols-2 gap-2 mt-2 opacity-20 pointer-events-none select-none">
                            <div className="border border-slate-200 p-2 rounded text-left bg-white text-[8px]">
                              <strong>Classic Editor</strong>
                              <p>LTS release text component builder.</p>
                            </div>
                            <div className="border border-slate-200 p-2 rounded text-left bg-white text-[8px]">
                              <strong>Akismet Guards</strong>
                              <p>Protects community forms from spam bots.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <button
                          onClick={() => setGuideStep(3)}
                          className="text-[#755a24] hover:text-[#041920] font-sans font-bold text-[10px] uppercase tracking-wider hover:underline"
                        >
                          Or click "Upload Plugin" in simulated page frame ➔
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 CLIENT SCREEN CONTENT */}
                  {guideStep === 3 && (
                    <div className="space-y-4 text-left animate-fade-in-up flex-grow flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <span className="text-[8px] uppercase font-bold tracking-widest text-[#755a24] bg-amber-100 text-[#755a24] px-2 py-0.5 rounded-full inline-block">
                          Step 3 of 4
                        </span>
                        <h4 className="font-serif text-lg font-black text-[#041920]">Simulated Zip File Upload</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                          A valid WordPress plugin must be structured in a compressed format. Click the file selector below to automatically load <code className="bg-slate-100 px-1 font-mono text-[10px]">amx-dubai-listings.zip</code>, then click <strong className="text-slate-800">Install Now</strong>.
                        </p>
                      </div>

                      {/* Interactive Drag drop upload drawer simulator */}
                      <div className="border border-slate-200 rounded-2xl p-4 md:p-5 bg-slate-50 space-y-3 shadow-inner my-2 flex-grow flex flex-col justify-center">
                        
                        <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-4 text-center select-none">
                          <UploadCloud className="h-7 w-7 text-[#755a24] mx-auto mb-1.5 animate-bounce" />
                          
                          {!zipSelected ? (
                            <div className="space-y-1">
                              <p className="text-[10.5px] text-slate-500 font-sans">
                                Drop your plugin's compiled .zip folder here
                              </p>
                              <button
                                type="button"
                                onClick={() => setZipSelected(true)}
                                className="bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-1 rounded-[6px] text-[9.5px] font-bold tracking-wide shadow-sm cursor-pointer"
                              >
                                Select: amx-dubai-listings.zip
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <p className="text-[11px] text-emerald-600 font-bold flex items-center justify-center gap-1">
                                <Check className="h-3.5 w-3.5" /> Successfully Packaged: amx-dubai-listings.zip
                              </p>
                              <p className="text-[8px] text-slate-400">Module size: 842.6 KB • Prepared for deployment</p>
                            </div>
                          )}
                        </div>

                        {/* Interactive Install triggers */}
                        <div className="flex justify-between items-center pt-1.5 shrink-0">
                          <button
                            onClick={() => setZipSelected(false)}
                            className="text-slate-400 hover:text-slate-600 font-sans text-[10px]"
                            disabled={isUploading}
                          >
                            Reset Selection
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (!zipSelected) {
                                setZipSelected(true);
                                return;
                              }
                              setIsUploading(true);
                              setUploadProgress(10);
                            }}
                            className={`px-4 py-1.5 rounded text-xs font-black transition-all shadow-md active:scale-95 cursor-pointer ${
                              isUploading
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                : 'bg-[#2271b1] hover:bg-[#135e96] text-white'
                            }`}
                            disabled={isUploading}
                          >
                            {isUploading ? 'Installing...' : 'Install Now ➔'}
                          </button>
                        </div>

                        {/* Interactive loading bar indicator */}
                        {isUploading && (
                          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                            <div className="flex justify-between items-center text-[9px] font-mono">
                              <span className="text-slate-500">Extracting: {uploadProgress}%</span>
                              <span className="text-amber-700 font-bold animate-pulse">Running check validations...</span>
                            </div>
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-[#755a24] h-full transition-all duration-300" 
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                      </div>

                      <div className="text-[10px] text-slate-400 text-center font-sans">
                        Tip: In production, WordPress will extract the bundled assets to the server container dynamically.
                      </div>
                    </div>
                  )}

                  {/* STEP 4 CLIENT SCREEN CONTENT */}
                  {guideStep === 4 && (
                    <div className="space-y-4 text-left animate-fade-in-up flex-grow flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <span className="text-[8px] uppercase font-bold tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                          Completed Phase
                        </span>
                        <h4 className="font-serif text-lg font-black text-[#041920]">Approve Activation &amp; Go Live</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                          Your server-side PHP plugin wrapper has successfully been unpacked on the WordPress host database. Activate the enqueuers to complete client-side hydration!
                        </p>
                      </div>

                      {/* Diagnostic shell panel wrapper */}
                      <div className="bg-[#0b1b21] rounded-xl p-4 font-mono text-[10px] text-slate-300 space-y-1 shadow-inner select-none tracking-wide text-left inline-block my-2 leading-relaxed">
                        <p className="text-slate-500">Unpacking the zip package...</p>
                        <p className="text-slate-500">Checking manifest files: plugin-settings validated</p>
                        <p className="text-slate-200">Enqueuing reactive scripts: assets/app.js &amp; assets/app.css enqueued</p>
                        <p className="text-emerald-400 font-bold">Plugin successfully installed &amp; verified!</p>
                      </div>

                      {pluginActivated ? (
                        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center space-y-2 animate-pulse my-2">
                          <p className="text-[11px] text-emerald-850 font-black flex items-center justify-center gap-1.5">
                            ✨ AMX PORTAL ACTIVATED LIVE ON YOUR WORDPRESS HOST ✨
                          </p>
                          <p className="text-[10px] text-slate-500 leading-relaxed">
                            Perfect! Any block, shortcode block, or widget holding <code className="font-mono bg-white px-1 py-0.5 border text-amber-900 border-slate-200">{`[amx_dubai_listings]`}</code> will now load high-end real-estate maps instantly!
                          </p>
                          <button
                            onClick={() => {
                              setGuideStep(1);
                              setZipSelected(false);
                              setIsUploading(false);
                              setUploadProgress(0);
                              setPluginActivated(false);
                            }}
                            className="bg-[#041920] text-emerald-100 text-[9px] uppercase font-label tracking-wide font-extrabold px-3.5 py-2 rounded-lg hover:bg-slate-800 transition-all cursor-pointer inline-block mt-2 duration-150 active:scale-95"
                          >
                            Restart WALKTHROUGH Simulator
                          </button>
                        </div>
                      ) : (
                        <div className="bg-white border border-slate-100 rounded-xl p-4 text-center my-2 flex justify-center items-center">
                          <button
                            type="button"
                            onClick={() => setPluginActivated(true)}
                            className="bg-[#2271b1] hover:bg-[#135e96] text-white px-6 py-2.5 rounded text-xs font-black transition-all shadow-md active:scale-95 cursor-pointer relative flex items-center gap-2 hover:shadow-lg"
                          >
                            <span>⚡ Activate Plugin Workspace</span>
                            <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffdea7] opacity-80"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#755a24]"></span>
                            </span>
                          </button>
                        </div>
                      )}

                      <div className="text-[9.5px] text-slate-400 text-center font-sans tracking-tight">
                        You can reset the status keys below or press back anytime to check config drawers.
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* BOTTOM PANEL CONTROLS */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center select-none shrink-0 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    if (guideStep > 1) {
                      setGuideStep((s) => s - 1);
                    }
                  }}
                  className={`flex items-center gap-1 text-slate-500 font-bold hover:text-[#041920] transition-colors leading-none cursor-pointer text-xs ${
                    guideStep === 1 ? 'opacity-35 cursor-not-allowed pointer-events-none' : ''
                  }`}
                  disabled={guideStep === 1}
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back Step
                </button>

                <span className="text-[10px] font-mono text-[#041920] font-black uppercase tracking-wider">
                  Simulation Stage {guideStep} of 4 
                </span>

                <button
                  type="button"
                  onClick={() => {
                    if (guideStep < 4) {
                      setGuideStep((s) => s + 1);
                    }
                  }}
                  className={`flex items-center gap-1 text-slate-500 font-bold hover:text-[#041920] transition-colors leading-none cursor-pointer text-xs ${
                    guideStep === 4 ? 'opacity-35 cursor-not-allowed pointer-events-none' : ''
                  }`}
                  disabled={guideStep === 4}
                >
                  Skip Next <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
