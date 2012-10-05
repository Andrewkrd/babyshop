<?php

/* SELECT m.*, u.user_colour, g.group_colour, g.group_type FROM (phpbb3x_moderator_cache m) LEFT JOIN phpbb3x_users u ON (m.user_id = u.user_id) LEFT JOIN phpbb3x_groups g ON (m.group_id = g.group_id) WHERE m.display_on_index = 1 AND m.forum_id = 12 */

$expired = (time() > 1349298887) ? true : false;
if ($expired) { return; }

$this->sql_rowset[$query_id] = array (
);
?>