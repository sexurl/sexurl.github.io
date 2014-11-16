$(function(){
  var $c = $('#blocks'),
      $blocks = parseBlocks(data.blocks, 1);

  $c.append($blocks);
  $(document).on('click', '.block', onBlockClick);
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

function onBlockClick(){
  var $e = $(this),
      $activeBlock = $('#active-block'),
      data = $e.data('block'),
      $content = '';

  $content += '<h2>' + data.title + '</h2>';
  $content += '<p>' + data.text + '</p>';

  $activeBlock.html($content);
}
