<?php

/* SELECT s.session_user_id, s.session_ip, s.session_viewonline FROM phpbb3x_sessions s WHERE s.session_time >= 1349301570 AND s.session_user_id <> 1 */

$expired = (time() > 1349301900) ? true : false;
if ($expired) { return; }

$this->sql_rowset[$query_id] = array (
  0 => 
  array (
    'session_user_id' => '2',
    'session_ip' => '81.163.64.126',
    'session_viewonline' => '0',
  ),
);
?>