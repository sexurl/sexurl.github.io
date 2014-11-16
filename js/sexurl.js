$(function(){
  var $c = $('#content'),
      $blocks = parseBlocks(data.blocks, 1);

  $c.append($blocks);
})


function parseBlocks(blocks, level) {
  var $blocks = [];

  $.each(blocks, function(i){
    var block = blocks[i];
        $block = $('<div class="block level-' + level + '">' + block.title + '</div>');

    $block.data('block', block);
    $blocks.push($block);

    if(block.childs){
      $blocks = $blocks.concat(parseBlocks(block.childs, level + 1));
    }
  })

  return $blocks;
}
