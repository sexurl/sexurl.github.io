$(function(){
  var $c = $('#blocks'),
      $blocks = parseBlocks(data.blocks, 1, null);

  $c.append($blocks);
  $(document).on('click', '.block', onBlockClick);
})

function parseBlocks(blocks, level, parent) {
  var $blocks = [];

  $.each(blocks, function(i){
    var block = blocks[i];
        $block = $('<div class="block level-' + level + '">' + block.title + '</div>');

    block.parent = parent;
    $block.data('block', block);
    $blocks.push($block);

    if(block.childs){
      $blocks = $blocks.concat(parseBlocks(block.childs, level + 1, block));
    }
  })

  return $blocks;
}

function onBlockClick(){
  var $e = $(this),
      $activeBlock = $('#active-block'),
      block = $e.data('block'),
      $content = '';

  $content += '<h2>' + block.title + '</h2>';
  $content += '<p>' + block.text + '</p>';

  $activeBlock.html($content);
  orderBlocks(block);
}

function orderBlocks(current){
  var $c = $('#blocks');

  // Sorting only root nodes
  if(current.parent) {
    current = current.parent;
  }

  data.blocks.sort(function(a,b) {
    return (current === a) ? -1 : 1;
  });

  $blocks = parseBlocks(data.blocks, 1, null);
  $c.html($blocks);
}
