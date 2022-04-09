var colors = ['bg-blue-spreader', 'bg-dark-blue-spreader', 'bg-yellow-spreader', 'bg-violet-spreader', 'bg-green-spreader', 'bg-info-spreader', 'bg-orange-spreader', 'bg-dark-violet-spreader'];
var socket = io('');
var list = [];
var cardSize = 380;
var maxWidth = $(document).width();
var maxHeight = $(document).height();

socket.emit('connection', 'admin');

socket.on('receive', function(data) {
  var bgColor = colors[Math.floor(Math.random() * colors.length)]
  
  var y = Math.floor(Math.random() * (maxHeight - cardSize) + 40);
  var x = Math.floor(Math.random() * (maxWidth - cardSize) + 40);

  const content = '<div class="card '+bgColor+'" style="top:'+y+'px;left:'+x+'px;"><div class="card-body"><div class="card-img"><img src="'+data.photo+'" alt="visitor"></div><div class="card-content m-auto w-75"><p>'+data.name+'</p><p>'+data.message+'</p></div></div></div>';

  $('.page-landing').append(content);
});
