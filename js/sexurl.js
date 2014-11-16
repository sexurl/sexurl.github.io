$(function(){
  var $c = $('#blocks'),
      $blocks = parseBlocks(data.blocks, 1, null);

  $c.append($blocks);
  $(document).on('click', '.block', onBlockClick);
  appearBlocks();
});

function appearBlocks(){
  $('.block').each(function(index, el){
    index+=1;
    window.setTimeout(function(){
      $(el).css({
        'opacity':1,
        'transform':'scale(1)'
      });
    }, index*50);
  });
}

function disappearBlocks(){
  var deferred = new $.Deferred();

  $('.block').each(function(index, el){
    index+=1;
    window.setTimeout(function(){
      $(el).css({
        'opacity':0,
        'transform':'scale(0.01)'
      });
      if(index==$('.block').length){
        deferred.resolve();
      }
    }, index*50);
  });

  return deferred.promise();
}

function parseBlocks(blocks, level, parent) {
  var $blocks = [];

  $.each(blocks, function(i){
    var block = blocks[i];
        $block = $('<div class="block level-' + level + '" id="' + block.slug + '">' + block.title + '</div>');

    $block.css({
      'opacity':0,
      'transform':'scale(0.01)'
    });

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
  var $c = $('#blocks'),
      blocks_els = $('#blocks .block');

  // Sorting only root nodes
  if(current.parent) {
    current = current.parent;
  }

  data.blocks.sort(function(a,b) {
    return (current === a) ? -1 : 1;
  });

  $blocks = parseBlocks(data.blocks, 1, null);

  disappearBlocks().then(function(){
    $('html,body').animate({
      scrollTop:0
    }, 500);
    $c.html($blocks);
    appearBlocks();
  })
}
