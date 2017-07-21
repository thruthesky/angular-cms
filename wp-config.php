<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'sonub');

/** MySQL database username */
define('DB_USER', 'sonub');

/** MySQL database password */
define('DB_PASSWORD', '12345a');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'gAbM$Q-6^dBSaOo[F!`etuMUj]w85vPz-Jd0@|Xh7TNV7`rHAolm~}O:#=^3E+c6');
define('SECURE_AUTH_KEY',  'EpM}Zkw$uC{>2b&cDN67f`G^c%PK>|ftsO{k@Hg(1qUV=(LD|{s1pNGk! ~LEoKC');
define('LOGGED_IN_KEY',    'L{~~@wvA>Ys&X2#~I;6jILXo,q(nhoHMy!XVY6X&`9B&n=H?d5j1.r__Xek|Y,dY');
define('NONCE_KEY',        'B9L/+@J^Jfc^$  85tBSI5<uT|g&aN&Llb~^*r/E$bNxK>?p,gd{/#Hi2l}Uq6%=');
define('AUTH_SALT',        '$:(pHZ},YjWwD3?=`,3k(C!|*D^UF;V88nnq14.Bb5}JH8Y9?V+WuL}eeLM%U~HF');
define('SECURE_AUTH_SALT', '](.Et0UQ*F,QHZ_%U2=yhIH,ak9,%[~r8*`zL/lMAGUek^i3U,oM1aP>L~5pqMna');
define('LOGGED_IN_SALT',   'jIUz|E(yx}1U$}RLtQWy@16;p*{c`QW>tvjFy8WChIkE4K5T=>{E!>BU!E5V+#!`');
define('NONCE_SALT',       'OH7>L+~Ij||YxlaK}tQiFckDM[iMu+vb^yQ,_F$q`Jbc&6dmO`~!BtP.uLz*_QR[');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
