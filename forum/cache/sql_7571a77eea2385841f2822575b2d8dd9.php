<?php

/* SELECT s.session_user_id, s.session_ip, s.session_viewonline FROM phpbb3x_sessions s WHERE s.session_time >= 1349226720 AND s.session_forum_id = 5 AND s.session_user_id <> 1 */

$expired = (time() > 1349227063) ? true : false;
if ($expired) { return; }

$this->sql_rowset[$query_id] = array (
);
?>