<?php

/* SELECT forum_id, forum_name, parent_id, forum_type, left_id, right_id FROM phpbb3x_forums ORDER BY left_id ASC */

$expired = (time() > 1349347775) ? true : false;
if ($expired) { return; }

$this->sql_rowset[$query_id] = array (
  0 => 
  array (
    'forum_id' => '3',
    'forum_name' => 'Общие вопросы',
    'parent_id' => '0',
    'forum_type' => '1',
    'left_id' => '1',
    'right_id' => '2',
  ),
  1 => 
  array (
    'forum_id' => '7',
    'forum_name' => 'RECARO и STM',
    'parent_id' => '0',
    'forum_type' => '1',
    'left_id' => '3',
    'right_id' => '4',
  ),
  2 => 
  array (
    'forum_id' => '4',
    'forum_name' => 'KIDDY',
    'parent_id' => '0',
    'forum_type' => '1',
    'left_id' => '5',
    'right_id' => '6',
  ),
  3 => 
  array (
    'forum_id' => '8',
    'forum_name' => 'CasualPlay',
    'parent_id' => '0',
    'forum_type' => '1',
    'left_id' => '7',
    'right_id' => '8',
  ),
  4 => 
  array (
    'forum_id' => '9',
    'forum_name' => 'Concord',
    'parent_id' => '0',
    'forum_type' => '1',
    'left_id' => '9',
    'right_id' => '10',
  ),
  5 => 
  array (
    'forum_id' => '11',
    'forum_name' => 'HTS BeSafe',
    'parent_id' => '0',
    'forum_type' => '1',
    'left_id' => '11',
    'right_id' => '12',
  ),
  6 => 
  array (
    'forum_id' => '5',
    'forum_name' => 'Наши детки:)))',
    'parent_id' => '0',
    'forum_type' => '1',
    'left_id' => '13',
    'right_id' => '14',
  ),
  7 => 
  array (
    'forum_id' => '12',
    'forum_name' => 'БАРАХОЛКА',
    'parent_id' => '0',
    'forum_type' => '1',
    'left_id' => '15',
    'right_id' => '16',
  ),
);
?>