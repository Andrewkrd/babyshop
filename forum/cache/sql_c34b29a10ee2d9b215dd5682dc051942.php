<?php

/* SELECT s.session_user_id, s.session_ip, s.session_viewonline FROM phpbb3x_sessions s WHERE s.session_time >= 1349285850 AND s.session_forum_id = 3 AND s.session_user_id <> 1 */

$expired = (time() > 1349286196) ? true : false;
if ($expired) { return; }

$this->sql_rowset[$query_id] = array (
  0 => 
  array (
    'session_user_id' => '16',
    'session_ip' => '66.249.73.92',
    'session_viewonline' => '1',
  ),
);
?>