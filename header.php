<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
    <style>
        /* Minimal responsive body styling reset to avoid default WordPress margins */
        body {
            margin: 0;
            padding: 0;
            background-color: #fbf9f9;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            color: #041920;
        }
        .amx-nav-bar {
            background-color: #041920;
            padding: 1.5rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #755a24;
        }
        .amx-nav-logo {
            font-family: 'Playfair Display', serif;
            font-weight: 900;
            text-transform: uppercase;
            font-size: 1.35rem;
            color: #ffdea7;
            text-decoration: none;
            letter-spacing: 0.05em;
        }
    </style>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="amx-nav-bar">
    <a href="<?php echo esc_url(home_url('/')); ?>" class="amx-nav-logo">
        AMX Dubai Luxury
    </a>
</header>
