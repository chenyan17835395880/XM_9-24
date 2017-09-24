window.onload=function(){
	let aside=$(".beside")[0];
	let ul=$("ul",aside)[0];
	// console.log(ul)
	let lis=$("li",ul);

	let rul=$(".beside-right");

	let baotu=$(".banner-bottom")[0];
	let tulis=$("li",baotu);
	let dians=$(".quan"); 

	let dirL=$(".left-direct")[0];
	let dirR=$(".right-direct")[0];
	let ban=$(".banner")[0];
	let wid=parseInt(getComputedStyle(ban,null).width);
	// console.log(dirR);
	let now=0;
	let next=0;
	//console.log(tulis.length);

	//console.log(lis);

/////////////////////////////////////////////////////////侧导航
	for(let i=0;i<lis.length;i++){
		lis[i].onmouseover=function(){
			rul[i].style.display="block";
			//animate(rul[i],{display:"block"});
		}
		lis[i].onmouseout=function(){
			rul[i].style.display="none";
			//animate(rul[i],{display:"none"});
		}
	}

///////////////////////////////////////////////////////////////自动轮播：时间函数
	/*
	next 初始位置(width,0)
	
	动画：
		now  (0,0)  ->  (-width,0)
		next (width,0)  ->  (0,0)

	更新下标：
		now=next
	 */	
	let t;
	t=setInterval(move, 3000);

	function move(){
		next++;
		if(next==tulis.length){
			next=0;
			//move();
		}
		dians[now].style.background="gray";
		dians[next].style.background="#fff";
		tulis[next].style.left=`${wid}px`;//wid+"px"
		animate(tulis[now],{left:-wid});//json对象不用加单位,animate.js内部已经处理了
		animate(tulis[next],{left:0},function(){//动画结束后flag=true
			flag=true;
		});
		now=next;
	}

	function moveL(){
		next++;
		if(next==tulis.length){
			next=0;
			//move();
		}
		dians[now].style.background="gray";
		dians[next].style.background="#fff";
		tulis[next].style.left=`${-wid}px`;//`${wid}px`
		animate(tulis[now],{left:wid});//json对象不用加单位,animate.js内部已经处理了
		animate(tulis[next],{left:0},function(){//动画结束后flag=true
			flag=true;
		});
		now=next;
	}

/////////////////////////////////////////鼠标移入时：不动；移出时：动
	ban.onmouseover=function(){
		clearInterval(t);
	}
	ban.onmouseout=function(){
		t=setInterval(move, 3000);
	}
////////////////////////////////////////点击左右按钮变
	let flag=true;
	dirR.onclick=function(){	
		/*if(flag){
			move();
			flag=false;
		}*/
		if(!flag){
			return;
		}
		move();
		flag=false;
	}
	dirL.onclick=function(){
		if(!flag){
			return;
		}
		moveL();
		flag=false;
	}
/////////////////////////////////////////////////////轮播图：点圆点出现相应的图片
	
	for(let i=0;i<tulis.length;i++){
		/*dians[i].onmouseover=function(){
			animate(dians[i],{background:"gray"});
		}*/
		dians[i].onclick=function(){
			// now++; 
			if(now==i){
				return;
			}
			dians[now].style.background="gray";
			dians[i].style.background="#fff";
			tulis[i].style.left=`${wid}px`;//`${wid}px`
			animate(tulis[now],{left:-wid});//json对象不用加单位,animate.js内部已经处理了
			animate(tulis[i],{left:0},function(){//动画结束后flag=true
				flag=true;
			});
			now=next=i;
		}
		
	}
////////////////////////////////////////////////////////////////小米明星单品
	let starBon=$(".star-top-right")[0];
	let fyL=$(".kuai",starBon)[0];
	let fyLi=$("i",fyL)[0];
	let fyR=$(".kuai-1",starBon)[0];
	let fyRi=$("i",fyR)[0];
	let star=$(".star")[0];
	let pic=$("ul",star)[0];
	let liP=$("li",pic);
	let widS=parseInt(getComputedStyle(star,null).width);//1226
	let widP=parseInt(getComputedStyle(pic,null).width);//2452
	console.log(fyRi);

	pic.innerHTML+=pic.innerHTML;
	pic.style.width=`${widP*2}px`;
	let i=0;
	fyRi.onclick=function(){
		//pic.style.transiton="all 0.5s";
		//pic.style.transform=`translateX(-${widS}px)`;
		//yidong();
		if(pic.offsetLeft==(`${i*-widS}`)){
			if(i==3){
				return;
			}
			i++;
			//console.log(i);
			animate(pic,{left:`${-widS*i}`});
		}
	}
	fyLi.onclick=function(){
		//yidong();
		if(pic.offsetLeft==(`${-widS*i}`)){
			if(i==0){
				return;
			}
			i--;
			//console.log(i);
			animate(pic,{left:`${-widS*i}`});
		}
	}	
	
	
	//let t1=setInterval(yidong,3000);
	function yidong(){	
		if(pic.offsetLeft==(`${i*-widS}`)){
			/*if(i==3){
				return;
			}
			i++;
			console.log(i);*/
			i++;
			animate(pic,{left:`${-widS*i}`});
		}
		
		if(pic.offsetLeft==(`${-widS*3}`)){
			/*if(i==0){
				return;
			}
			i--;*/
			i--;
			console.log(i);
			animate(pic,{left:`${-widS*i}`});
		}
	}

//////////////////////////////////////////////////////////////////按需加载：滚动到哪块，再显示哪块
	/*
	按需加载：减少发送请求的次数
	楼层出现：
		innerHeight + scrollTop =offsetTop
	 */
	let winH=innerHeight;
	let floors=document.querySelectorAll(".floor");//nodelist
	console.log(floors);
	let floorsArr=[];
	floors.forEach((element)=>{
		floorsArr.push(element.offsetTop);
	});
	// for(let i=0;i<floors.length;i++){
	// 	floorsArr.push(floors[i].offsetTop);
	// }
	console.log(floorsArr);
	window.onscroll=function(){
		// console.log(document.body.scrollTop);
		let scrolls=document.documentElement.scrollTop;//滚动的距离
		floorsArr.forEach((value,index)=>{
			if(winH+scrolls>=value+200){
				//let imgs=document.querySelectorAll(".imgF");
				let imgs=floors[index].getElementsByTagName("img");
				console.log(imgs);
				for(let i=0;i<imgs.length;i++){
					imgs[i].src=imgs[i].getAttribute("srcPath");
				}
				
			}
		})
	}

//////////////////////////////////////////////////////////////////////购物车
	let gouwu=$(".buy-box")[0];console.log(gouwu);
	let gouwuZ=$(".buy")[0];console.log(gouwuZ);
	let gouwuK=$(".buy-chu")[0];console.log(gouwuK);

	gouwu.onmouseover=function(){
		gouwuK.style.display="block";
		gouwuZ.style.color="#FF6700";
	}
	gouwu.onmouseout=function(){
		gouwuK.style.display="none";
		gouwuZ.style.color="#B0B0B0";
	}






}

