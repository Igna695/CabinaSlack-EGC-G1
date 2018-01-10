UPDATE wp_options SET option_value = replace(option_value, 'http://localhost/splc', 'http://localhost:8090') WHERE option_name = 'home' OR option_name = 'siteurl';

UPDATE wp_posts SET guid = replace(guid, 'http://localhost/splc','http://localhost:8090');

UPDATE wp_posts SET post_content = replace(post_content, 'http://localhost/splc', 'http://localhost:8090');

UPDATE wp_postmeta SET meta_value = replace(meta_value,'http://localhost/splc','http://localhost:8090');