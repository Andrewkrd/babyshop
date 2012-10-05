<?php

/* SELECT s.session_user_id, s.session_ip, s.session_viewonline FROM phpbb3x_sessions s WHERE s.session_time >= 1349266890 AND s.session_user_id <> 1 */

$expired = (time() > 1349267239) ? true : false;
if ($expired) { return; }

$this->sql_rowset[$query_id] = array (
);
?>