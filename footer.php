<?php
/**
 * Footer template file completing theme structure context.
 */
?>

<footer style="background-color: #041920; border-t: 1px solid rgba(255,255,255,0.05); color: #81969e; text-align: center; padding: 3rem 1.5rem; font-size: 11px; font-family: sans-serif;">
    <div style="max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; md:flex-row; justify-content: space-between; align-items: center; gap: 1rem;">
        <p style="margin: 0;">&copy; <?php echo date('Y'); ?> AMX Dubai Luxury Real Estate Portal. All Rights Reserved.</p>
        <div style="display: flex; gap: 15px;">
            <a href="#" style="color: #ffdea7; text-decoration: none;">Terms of Service</a>
            <span style="opacity: 0.3;">|</span>
            <a href="#" style="color: #ffdea7; text-decoration: none;">Privacy Protocol</a>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
