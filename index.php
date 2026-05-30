<?php
/**
 * Main template file for the AMX Dubai Luxury Real Estate Theme.
 * This file renders the primary SPA container for the React catalog application.
 *
 * @package AMX_Dubai_Listings_Theme
 */

get_header();
?>

<main id="primary" class="site-main">
    <!-- Hydration target for compiled modern React build -->
    <div id="root" class="amx-listings-wordpress-wrapper">
        <!-- React App mounts here dynamically -->
        <noscript>
            <div style="padding: 40px; text-align: center; font-family: sans-serif;">
                <h2>JavaScript Required</h2>
                <p>The AMX Dubai Luxury Real Estate Portal requires JavaScript to execute spatial rendering maps. Please enable JavaScript in your browser settings.</p>
            </div>
        </noscript>
    </div>
</main>

<?php
get_footer();
