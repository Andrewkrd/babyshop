<?php

/* SELECT ban_ip, ban_userid, ban_email, ban_exclude, ban_give_reason, ban_end FROM phpbb3x_banlist WHERE (ban_ip = '' OR ban_exclude = 1) AND (ban_userid = 0 OR ban_exclude = 1) */

$expired = (time() > 1349286135) ? true : false;
if ($expired) { return; }

$this->sql_rowset[$query_id] = array (
);
?>