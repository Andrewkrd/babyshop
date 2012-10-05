<?php

/* SELECT s.session_user_id, s.session_ip, s.session_viewonline FROM phpbb3x_sessions s WHERE s.session_time >= 1349277090 AND s.session_user_id <> 1 */

$expired = (time() > 1349277441) ? true : false;
if ($expired) { return; }

$this->sql_rowset[$query_id] = array (
);
?>