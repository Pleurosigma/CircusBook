$(init);

function init(){
	$('#scene').bind('touchstart', function(){
		alert('hi');
	});
}

function getActualCords(scene, evt){
	var cords = new Object();
	cords.x = evt.pageX - scene.offset().left;
	cords.y = evt.pageY - scene.offset().top;
	return cords;
}