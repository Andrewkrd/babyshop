<?php

/* SELECT COUNT(DISTINCT s.session_ip) as num_guests FROM phpbb3x_sessions s WHERE s.session_user_id = 1 AND s.session_time >= 1349274720 */

$expired = (time() > 1349275099) ? true : false;
if ($expired) { return; }

$this->sql_rowset[$query_id] = array (
  0 => 
  array (
    'num_guests' => '1',
  ),
);
?>