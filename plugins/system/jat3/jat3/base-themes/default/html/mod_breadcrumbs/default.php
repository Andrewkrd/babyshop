<?php
/**
 * @version		$Id: default.php 18334 2010-08-05 14:03:31Z infograf768 $
 * @package		Joomla.Site
 * @subpackage	mod_breadcrumbs
 * @copyright	Copyright (C) 2005 - 2010 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;
?>
<span class="breadcrumbs<?php echo $params->get('moduleclass_sfx'); ?> pathway" xmlns:v="http://rdf.data-vocabulary.org/#">
<?php if ($params->get('showHere', 1))
	{
		echo '<strong>'.JText::_('MOD_BREADCRUMBS_HERE').'</strong>';
	}
?>
<?php for ($i = 0; $i < $count; $i ++) :

	// If not the last item in the breadcrumbs add the separator
	if ($i < $count -1) {
		if (!empty($list[$i]->link)) {
			echo '<span typeof="v:Breadcrumb"><a href="'.$list[$i]->link.'" class="pathway" rel="v:url" property="v:title">'.$list[$i]->name.'</a></span>';
		} else {
			echo $list[$i]->name;
		}
		if($i < $count -2){
			echo ' '.$separator.' ';
		}
	}  else if ($params->get('showLast', 1)) { // when $i == $count -1 and 'showLast' is true
		if($i > 0){
			echo ' '.$separator.' ';
		}
		echo '<span class="ja-breadcrums_rdf" typeof="v:Breadcrumb">' . $list[$i]->name . '</span>';
	}
endfor; ?>
</span>
