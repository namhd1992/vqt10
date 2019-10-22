import React from 'react'
import { bindActionCreators } from 'redux'
import Pagination from "react-js-pagination";
import { connect } from 'react-redux'
import './css/style.css';
import {
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn,
	getTuDo,
	getCodeBonus,
	getVinhDanh,
} from '../../modules/lucky'
import Wheel from './Winwheel'
import {
	getData
} from '../../modules/profile'
import rotaion from './images/muivongquay.png'
import bg_rotaion from './khungvongquay.png'

import backtotop from './images/backtotop.png'
import sukiendangdienra from './images/btn-sukiendangdienra.png'
import sapdienra from './images/btn-sapdienra.png'
import ketthuc from './images/btn-ketthuc.png'
import logo from './images/logo.png';
import thamgiangay from './images/btn-thamgiangay.gif';
import iphone_11_pro_max from './images/iphone-11-pro-max.png';
import vqmm_p2 from './images/vqmm-p2.png';
import btn_quay_p2 from './images/btn-quay-p2.png';
import honda from './images/honda.png';
import iphone_xs from './images/iphone-xs.png';
// import xiaomi_black from './images/xiaomi-black-shark-2.png';
import icon_bangvinhdanh from './images/icon-bangvinhdanh.png';
import logo_splay from './images/logo_splay.png';
import logo_scoin from './images/logo_scoin.png';
import img_phanthuong from './images/img-phanthuong.png';
import btn_close from './images/btn-close.png';
import img_card10k from './images/img-card10k.png';
import img_card50k from './images/img-card50k.png';
import img_card100k from './images/img-card100k.png';
import img_card500k from './images/img-card500k.png';
import img_thele from './images/img-thele.png';
import img_tudo from './images/img-tudo.png';
import img_maduthuong from './images/img-maduthuong.png';
import img_thongbao from './images/img-thongbao.png';
import img_livestream from './images/img-livestream.png';
// import muiten from './images/muiten.png';
import ReactResizeDetector from 'react-resize-detector'
import spin from './images/spin.gif';
import $ from 'jquery';
import 'bootstrap';

const styles = {
	paper: {
		background: "#fff",
	},
};

class Lucky_Rotation extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			numberShow:15,
			isAll:true,
			wheelPower:0,
			wheelSpinning:false,
			stop:true,
			theWheel:null,
			auto: false,
			userTurnSpin:{},
			itemOfSpin:[],
			luckySpin:{},
			userTurnSpin:{},
			turnsFree:0,
			isLogin:false,
			day:'00',
			hour:'00', 
			minute:'00', 
			second:'00',
			itemBonus:{},
			numberItemInpage:5,
			activeCodeBonus:1,
			activeVinhDanh:1,
			activeTuDo:1,
			countVinhDanh:0,
			countTuDo:0,
			countCodeBonus:0,
			dataVinhDanh:[],
			dataTuDo:[],
			dataCodeBonus:[],
			listVinhDanh:[],
			listTuDo:[],
			listCodeBonus:[],
			width:0,
			height:0,
			img_width:0,
			img_height:0,
			code:true,
			inputValue: '',
			noti_mdt:false,
			noti_tudo:false,
			numberPage:3,
			img_status: sukiendangdienra,
			message_status:'',
			data_auto:[],
			isSpin:false,
			closeAuto:true,
			message_error:'',
			server_err:false,
			finished:false,
			hour_live:'00', 
			minute_live:'00', 
			second_live:'00',
			linkLiveStream:'',
		};
	}
	componentWillMount(){
		// if (window.innerWidth <= 320) {
		// 	this.setState({ width: 242, height: 378, img_width:280, img_height:280});
		// }
		// if (window.innerWidth > 320 && window.innerWidth <= 480) {
		// 	this.setState({ width: 260, height: 405, img_width:300, img_height:300});
		// }
		// if (window.innerWidth > 480 && window.innerWidth <= 600) {
		// 	this.setState({ width: 400, height: 500, img_width:500, img_height:500});
		// }
		// if (window.innerWidth > 600 && window.innerWidth <= 768) {
		// 	this.setState({ width: 485, height: 500, img_width:560, img_height:560});
		// }
		// if (window.innerWidth > 768 && window.innerWidth < 1024) {
		// 	this.setState({ width: 650, height: 700, img_width:750, img_height:750});
		// }
		// if (window.innerWidth >= 1024) {
		// 	this.setState({ width: 645, height: 830, img_width:752, img_height:752});
		// }

		this.onResize()
		window.removeEventListener('scroll', this.handleScroll);
	}



	componentDidMount(){
		const {img_width, img_height}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		this.timeRemain();
		if (user !== null) {
			this.props.getRotationDetailDataUser(user.access_token, 119).then(()=>{
				var data=this.props.dataRotationWithUser;
				if(data!==undefined){
					if(data.status==='01'){
						if(data.data.itemOfSpin[1].quantity===0 && data.data.itemOfSpin[4].quantity===0){
							var time=(1566815400000-Date.now())/1000;
							this.setState({finished:true})
							if(time>0){
								$('#myModal13').modal('show');
							}else{
								$('#myModal14').modal('show');
							}
							
						}
						this.getStatus(data.data.luckySpin)
						this.setState({userTurnSpin:data.data.userTurnSpin, itemOfSpin:data.data.itemOfSpin, luckySpin:data.data.luckySpin, turnsFree:(data.data.userTurnSpin.turnsFree+data.data.userTurnSpin.turnsBuy), isLogin:true, linkLiveStream:data.data.luckySpin.linkLiveStream})
					}else{
						$('#myModal11').modal('show');
						this.setState({message_error:'Không lấy được dữ liệu người dùng. Vui lòng tải lại trang.'})
					}
				}else{
					$('#myModal12').modal('show');
					this.setState({server_err:true})
				}
				
			});
		} else {
			this.props.getRotationDetailData(119).then(()=>{
				var data=this.props.dataRotation;
				if(data!==undefined){
					if(data.status==='01'){
						if(data.data.itemOfSpin[1].quantity===0 && data.data.itemOfSpin[4].quantity===0){
							var time=(1566815400000-Date.now())/1000;
							this.setState({finished:true})
							if(time>0){
								$('#myModal13').modal('show');
							}else{
								$('#myModal14').modal('show');
							}
						}
						this.getStatus(data.data.luckySpin)
						this.setState({userTurnSpin:data.data.userTurnSpin, itemOfSpin:data.data.itemOfSpin, luckySpin:data.data.luckySpin, turnsFree:(data.data.userTurnSpin.turnsFree+data.data.userTurnSpin.turnsBuy), isLogin:false, linkLiveStream:data.data.luckySpin.linkLiveStream})
					}else{
						$('#myModal11').modal('show');
						this.setState({message_error:'Không lấy được dữ liệu.  Vui lòng tải lại trang.'})
					}
				}else{
					$('#myModal12').modal('show');
					this.setState({server_err:true})
				}
			});
		}
		this.getVinhDanh();
		
		let theWheel = new Wheel({
			'numSegments'       : 10,         // Specify number of segments.
			'outerRadius'       : 150,       // Set outer radius so wheel fits inside the background.
			'drawMode'          : 'image',   // drawMode must be set to image.
			'drawText'          : true,      // Need to set this true if want code-drawn text on image wheels.
			'textFontSize'      : 12,        // Set text options as desired.
			'textOrientation'   : 'curved',
			'textDirection'     : 'reversed',
			'textAlignment'     : 'outer',
			'textMargin'        : 5,
			'textFontFamily'    : 'monospace',
			'textStrokeStyle'   : 'black',
			'textLineWidth'     : 2,
			'responsive'   : true,
			'textFillStyle'     : 'white',

			'animation' :                 
			{
				'type'     : 'spinToStop',
				'duration' : 5,    
				'spins'    : 10,    
				'callbackFinished' : this.completeRotation
			}
		});

		let loadedImg = new Image();
		loadedImg.onload = function()
		{
			theWheel.wheelImage = loadedImg;   
			theWheel.draw();                    
		}
		loadedImg.width=img_width;
		loadedImg.height=img_height;
		loadedImg.src = rotaion;
		this.setState({theWheel:theWheel})
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);
		this.setState({ auto : !this.state.auto});
	}

	onResize=()=>{
		if (window.innerWidth <= 320) {
			this.setState({ width: 242, height: 280, img_width:280, img_height:280});
		}
		if (window.innerWidth > 320 && window.innerWidth <= 480) {
			this.setState({ width: 260, height: 300, img_width:300, img_height:300});
		}
		if (window.innerWidth > 480 && window.innerWidth <= 600) {
			this.setState({ width: 400, height: 500, img_width:500, img_height:500});
		}
		if (window.innerWidth > 600 && window.innerWidth <= 768) {
			this.setState({ width: 485, height: 500, img_width:560, img_height:560});
		}
		if (window.innerWidth > 768 && window.innerWidth < 1024) {
			this.setState({ width: 650, height: 650, img_width:750, img_height:750});
		}
		if (window.innerWidth >= 1024) {
			this.setState({ width: 645, height: 752, img_width:752, img_height:752});
		}
	}

	getVinhDanh=()=>{
		this.props.getVinhDanh(119).then(()=>{
			var data=this.props.dataVinhDanh;
			if(data!==undefined){
				if(data.status==='01'){	
					this.setState({dataVinhDanh:data.data, countVinhDanh:data.data.length, listVinhDanh:data.data.slice(0, 10)})
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Không lấy được dữ liệu bảng vinh danh.'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	getStatus=(luckySpin)=>{
		var start=luckySpin.startDate;
		var end=luckySpin.endDate;
		var time=Date.now();

		var distance_3day=start - 3 * 86400 * 1000;
		var duration=end-time;

		if (time < start) {
			this.timeRemain(start)
			this.setState({ img_status: sapdienra, message_status:"Sự kiện chưa diễn ra."});
		}
		if (time > start && time < end) {
			this.timeRemain(end)
			this.setState({ img_status: sukiendangdienra});
		}
		if (time > end) {
			this.setState({ img_status: ketthuc, message_status:"Sự kiện đã kết thúc."});
		}
	}

	handleScroll = (event) => {
		if (document.body.getBoundingClientRect().top < -300){
			$("#button").show();
		}else{
			$("#button").hide();
		}
	}

	loginAction = () => {
		const {server_err}=this.state;
		if(!server_err){
			if (typeof(Storage) !== "undefined") {
				var currentPath = window.location.pathname;
				localStorage.setItem("currentPath", currentPath);
			} else {
				console.log("Trình duyệt không hỗ trợ localStorage");
			}
			// window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}/login&agencyid=0`)
			window.location.replace(`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&agencyid=0&redirect_uri=${window.location.protocol}//${window.location.host}/`);
		}else{
			$('#myModal12').modal('show');
		}
	}
	logoutAction = () => {
		localStorage.removeItem("user");
		// window.location.replace(
		// 	`https://graph.vtcmobile.vn/oauth/authorize?client_id=707fece431a0948c498d43e881acd2c5&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		// );

		window.location.replace(
			`http://sandbox.graph.vtcmobile.vn/oauth/authorize?client_id=4e7549789b14693eda4e019faaa0c446&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
		);
	}

	start=()=>{
		const {turnsFree, itemOfSpin, luckySpin, isSpin, closeAuto, finished}=this.state;
		var _this = this;
		var user = JSON.parse(localStorage.getItem("user"));
		var time=Date.now();
		if(time > luckySpin.endDate || time < luckySpin.startDate){
			$('#myModal8').modal('show');
		}else{
			if (user !== null) {
				if(!finished){
					if(turnsFree>0){
						this.props.pickCard(user.access_token, luckySpin.id).then(()=>{
							var data=_this.props.dataPick;
							var list=this.state.data_auto;
							if(data!==undefined){
								if(data.status ==="01"){
									if(data.data.item.type==="LUCKY_NUMBER"){
										this.setState({code:true})
										setTimeout(()=>{
											this.setState({noti_mdt:true})
										},2000)
									}else{
										if(data.data.item.type!=="ACTION"){
											setTimeout(()=>{
												this.setState({noti_tudo:true})
											},2000)
											this.getVinhDanh();	
										}
										this.setState({code:false})
										
									}
									list.push(data.data.item.name);
									var pos=1;
									if(data.data.item.type==="SCOIN"){
										pos=9;
									}else{
										var id=_this.props.dataPick.data.id;
										console.log(id)
										console.log(itemOfSpin)
										pos = itemOfSpin.map(function(e) { return e.id; }).indexOf(id);
									}
									
									this.resetWheel();
									if(!isSpin && closeAuto){
										this.startSpin(pos+1);
									}	
									_this.setState({itemBonus: data.data.item, data_auto: list, closeAuto:true});
								}else if(data.status ==="04"){
									$('#myModal13').modal('show');
								}else if(data.status ==="07"){
										this.setState({message_status:"Sự kiện chưa diễn ra hoặc đã kết thúc."},()=>{
										$('#myModal8').modal('show');
									})
								}else{
									$('#myModal11').modal('show');
									this.setState({message_error:'Vòng quay đang có lỗi. Vui lòng tải lại trang.'})
								}
							}else{
								$('#myModal12').modal('show');
								this.setState({server_err:true})
							}
						})
						
					}else{
						$('#myModal6').modal('show');
					}
				}else{
					$('#myModal13').modal('show');
				}
			} else {
				$('#myModal5').modal('show');
			}
		}
		
	}

	btnStart=()=>{
		const {wheelSpinning}=this.state;
		if(!wheelSpinning){
			this.setState({data_auto:[], closeAuto:true},()=>{
				this.start();
			})
		}	
	}

	startSpin=(segmentNumber)=>{
		const {wheelSpinning, wheelPower, theWheel}=this.state;
		if (wheelSpinning == false) {
			let stopAt = theWheel.getRandomForSegment(segmentNumber);
			theWheel.animation.stopAngle = stopAt;
			theWheel.startAnimation();
			this.setState({wheelSpinning: true, stop:false});
		}
	}
	
	// stopSpin=()=>{
	// 	const {wheelSpinning, wheelPower, theWheel, stop}=this.state;
	// 	if (stop == false) {

	// 		theWheel.stopAnimation(false);
	// 		theWheel.animation.spins = 1;
	// 		theWheel.rotationAngle = 0;
	// 		theWheel.draw(); 
	// 		theWheel.startAnimation();
	// 		// theWheel.stopAnimation(false);
	// 		this.setState({wheelSpinning: true, stop:true});
	// 	}
	// }

	resetWheel=()=>{
		const { theWheel}=this.state;
		theWheel.stopAnimation(false);
		theWheel.animation.spins = 10; 
		theWheel.rotationAngle = 0;   
		theWheel.draw();              
		this.setState({wheelSpinning: false});    
	}

	completeRotation=()=>{
		const {auto, turnsFree, theWheel, itemBonus}=this.state;
		if(auto){
			var intervalId = setInterval(this.autoRotation, 2000);
			$('#myModal9').modal('show');
   			this.setState({intervalId: intervalId, isSpin: true, closeAuto:false, wheelSpinning: false});
			
		}else{
			if(itemBonus.type!=="ACTION"){
				$('#myModal4').modal('show');
			}
			this.setState({isSpin: false, closeAuto:true, wheelSpinning: false});
			this.getDetailData()
		}
	}

	handleChange = () => {
		this.setState({ auto : !this.state.auto});
	};


	autoRotation=()=>{
		const {turnsFree, luckySpin}=this.state;
		if(turnsFree>0){
			this.getDetailData();
		}else{
			clearInterval(this.state.intervalId);
		}
	}


	getDetailData=()=>{
		const {auto}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		this.props.getRotationDetailDataUser(user.access_token, 119).then(()=>{
			var data=this.props.dataRotationWithUser;
			if(data!==undefined){
				var turnsFree=data.data.userTurnSpin.turnsFree+data.data.userTurnSpin.turnsBuy;
				if(data.status==='01'){
					if(turnsFree>0){
						if(auto){
							this.start();
						}
					}else{
						$('#myModal6').modal('show');
						clearInterval(this.state.intervalId);
					}
					this.setState({turnsFree:turnsFree})
				}else if(data.status ==="04"){
					$('#myModal13').modal('show');
				}else{
					$('#myModal11').modal('show');
					this.setState({message_error:'Lỗi hệ thống. Vui lòng thử lại.'})
				}
			}else{
				$('#myModal12').modal('show');
				this.setState({server_err:true})
			}
		});
	}

	// showPopup=()=>{
	// 	const {itemBonus, turnsFree}=this.state;

	// 	setTimeout(()=>{
	// 		$('#myModal4').modal('hide');
	// 		if(turnsFree>0){
	// 			this.start()
	// 		}
	// 	},2000)
	// 	if(itemBonus.keyName!=="matluot"){
	// 		$('#myModal4').modal('show');
	// 	}
	// }

	timeRemain=()=>{
		var _this=this;
		setInterval(()=>{
			var time=(1566815400000-Date.now())/1000;
			if(time>0){
				var day=Math.floor(time/86400) > 9 ? Math.floor(time/86400) : `0${Math.floor(time/86400)}`;
				var hour=Math.floor((time%86400)/3600) > 9 ? Math.floor((time%86400)/3600) : `0${Math.floor((time%86400)/3600)}`;
				var minute=Math.floor(((time%86400)%3600)/60) > 9 ? Math.floor(((time%86400)%3600)/60) : `0${Math.floor(((time%86400)%3600)/60)}`;
				var second=Math.ceil(((time%86400)%3600)%60) > 9 ? Math.ceil(((time%86400)%3600)%60) : `0${Math.ceil(((time%86400)%3600)%60)}`;
				// _this.setState({day:day, hour: hour, minute: minute, second:second})
				_this.setState({hour_live: hour, minute_live: minute, second_live:second})
			}
		}, 1000);
	}



	showModalBonus=()=>{
		$('#myModal').modal('show'); 
	}

	hideModalBonus=()=>{
		$('#myModal').modal('hide');
	}

	showModalRules=()=>{
		$('#myModal1').modal('show'); 
	}

	hideModalRules=()=>{
		$('#myModal1').modal('hide');
	}

	showModalTuDo=()=>{
		const {luckySpin}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		if (user !== null) {
			this.props.getTuDo(user.access_token, luckySpin.id).then(()=>{
				var data=this.props.dataTuDo;
				if(data!==undefined){
					if(data.status==='01'){
						this.setState({dataTuDo:data.data, countTuDo:data.data.length, listTuDo: data.data.slice(0,5), noti_tudo:false})
					}else{
						$('#myModal11').modal('show');
						this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
					}
				}else{
					$('#myModal12').modal('show');
					this.setState({server_err:true})
				}
			});
			$('#myModal4').modal('hide');
			$('#myModal2').modal('show');
		}else {
			$('#myModal5').modal('show');
		}
	}

	hideModalTuDo=()=>{
		$('#myModal2').modal('hide');
	}

	showModalCodeBonus=()=>{
		const {luckySpin}=this.state;
		var user = JSON.parse(localStorage.getItem("user"));
		if(user !== null){
			this.props.getCodeBonus(user.access_token, luckySpin.id, 'LUCKY_NUMBER').then(()=>{
				var data=this.props.dataCodeBonus;
				if(data!==undefined){
					if(data.status==='01'){
						this.setState({dataCodeBonus:data.data, countCodeBonus:data.data.length, listCodeBonus: data.data.slice(0,5), noti_mdt:false})
					}else{
						$('#myModal11').modal('show');
						this.setState({message_error:'Chưa tải được dữ liệu. Vui lòng thử lại'})
					}
				}else{
					$('#myModal12').modal('show');
					this.setState({server_err:true})
				}
			});
			$('#myModal4').modal('hide');
			$('#myModal3').modal('show');
		}else {
			$('#myModal5').modal('show');
		}
	}

	closePopupAuto=()=>{
		clearInterval(this.state.intervalId);
		this.setState({ isSpin:false, closeAuto:false});
		$('#myModal9').modal('hide');
	}

	hideModalCodeBonus=()=>{
		$('#myModal3').modal('hide');
	}

	showModalDetailBonus=()=>{
		$('#myModal4').modal('show');
	}

	hideModalDetailBonus=()=>{
		$('#myModal4').modal('hide');
	}
	closeServerErr=()=>{
		$('#myModal12').modal('hide');
	}

	closePopupFinish=()=>{
		$('#myModal13').modal('hide');
	}

	// hideModalCode=()=>{
	// 	$('#myModal7').modal('hide');
	// }


	handlePageChangeTuDo=(pageNumber)=> {
		const {dataTuDo}=this.state;
		var newPosition=(pageNumber-1)*5
		this.setState({activeTuDo: pageNumber, listTuDo: dataTuDo.slice(newPosition, newPosition+5)});
	}

	handlePageChangeCodeBonus=(pageNumber)=> {
		const {dataCodeBonus}=this.state;
		var newPosition=(pageNumber-1)*5
		this.setState({activeCodeBonus: pageNumber, listCodeBonus: dataCodeBonus.slice(newPosition, newPosition+5)});
	}

	handlePageChangeVinhDanh=(pageNumber)=> {
		const {dataVinhDanh}=this.state;
		var newPosition=(pageNumber-1)*10
		this.setState({activeVinhDanh: pageNumber, listVinhDanh: dataVinhDanh.slice(newPosition, newPosition+10)});
	}

	openTabNapScoin=(url)=> {
		window.open(url, '_blank').focus();
	}

	findCode=(evt)=>{
		var value=evt.target.value
		// this.setState({
		// 	inputValue: evt.target.value
		//   });
		const {dataCodeBonus}=this.state;
		var data=dataCodeBonus.filter(v=>v.description.indexOf(value)!==-1)
		this.setState({countCodeBonus:data.length, listCodeBonus:data.slice(0,5)})
	}

	showPopupLiveStream=()=>{
		var time=(1566815400000-Date.now())/1000;
		if(time>0){
			this.setState({message_error:'Chưa đến thời điểm live stream'},()=>{
				$('#myModal11').modal('show');
			})
		}else{
			$('#myModal14').modal('show');
		}
	}

	randomItemIndex=()=>{
		// var item = items[Math.floor(Math.random()*items.length)];
	}

	render() {
		const {height, width, dialogLoginOpen, dialogBonus, auto, dialogWarning, textWarning, isLogin, userTurnSpin, day, hour, minute, second, code,numberPage, img_status, message_status, data_auto,message_error,linkLiveStream,
			 activeTuDo, activeCodeBonus, activeVinhDanh, numberItemInpage, countCodeBonus, countTuDo, countVinhDanh, listCodeBonus, listTuDo, listVinhDanh,itemBonus, turnsFree, noti_mdt, noti_tudo, finished, hour_live, minute_live, second_live}=this.state;
		const { classes } = this.props;
		const notification_mdt=noti_mdt?(<span className="badge badge-pill badge-danger position-absolute noti-mdt">!</span>):(<span></span>);
		const notification_tudo=noti_tudo?(<span className="badge badge-pill badge-danger position-absolute noti-tudo">!</span>):(<span></span>);
		return (<div>
			<a href="#logo" id="button"><img src={backtotop} alt="Back to Top" width="16" /></a>
			<div className="container-fluid page1">
				<div className="content-inner-p1">
					<h1 className="logo-p1" id="logo"><img src={logo} alt="Logo" width="500" className="img-fluid" /></h1>
					<div className="container">
						<div className="timer-p1 float-right">
							<img src={img_status} alt="Sự kiện đang diễn ra" width="298" className="img-fluid" />
							<div className="table-responsive">
							<table className="table table-borderless text-white">
								<tr>
									<td className="cell-timer-p1 display-5 text-center">{day}</td>
									<td className="cell-timer-p1 display-5 text-center">{hour}</td>
									<td className="cell-timer-p1 display-5 text-center">{minute}</td>
									<td className="cell-timer-p1 display-5 text-center">{second}</td>
								</tr>
								<tr>
									<td align="center" className="p-0 h6">Ngày</td>
									<td align="center" className="p-0 h6">Giờ</td>
									<td align="center" className="p-0 h6">Phút</td>
									<td align="center" className="p-0 h6">Giây</td>
								</tr>
							</table>
							{(finished)?(<div className="alert alert-danger text-center">
								<p className="text-dark mb-0">Đã phát hết Mã dự thưởng</p>
								<h2>100,000 / 100,000</h2>
							</div>):(<div></div>)}
							
							</div>
						</div> 
					</div>
					<p className="btn-thamgiangay"><a href="#p2" title="Tham gia ngay"><img src={thamgiangay} alt="Tham gia ngay" width="200" className="img-fluid" /></a></p>
					<div className="position-absolute-p1">
						<ul className="nav flex-column menu-left-p1">
							<li className="pt-6"><a href="http://scoin.vn/nap-tien" title="Nạp Scoin" target="_blank">Nạp Scoin</a></li>
							<li className="pt-5b"><a href="#" title="Thể lệ" onClick={this.showModalRules}>Thể lệ</a></li>
							<li className="pt-5b"><a href="#" title="Phần thưởng" onClick={this.showModalBonus}>Phần thưởng</a></li>
							<li className="pt-5a"><a href="#bvd" title="Vinh danh">Vinh danh</a></li>
						</ul>
					</div>
				</div>
			</div>
			{/* End p1 */}

			<div id="p2" className="container-fluid page2">
				<div className="container content-inner-p2">
					<h1 className="logo-p2"><img src={logo} alt="Logo" width="600" className="img-fluid" /></h1>
					<div className="vqmm">
							<canvas style={{}} id="canvas" width={width} height={height} data-responsiveMinWidth="180"  data-responsiveScaleHeight="true">		
							</canvas>
							{/* <canvas style={{marginTop:-(height+15), padding:0}} id="new_canvas" width={width} height={height} data-responsiveMinWidth="180"  data-responsiveScaleHeight="true">
								
							</canvas> */}
						{/* <img src={vqmm_p2} alt="Vòng quay may mắn" className="img-fluid"/>     */}
					</div>
					<div className="btn-logout">
						{(isLogin)?(<div><p className="p-0 m-0 text-center">Xin chào {userTurnSpin.currName}</p>
						<h5 className="text-center" onClick={this.logoutAction}><a style={{cursor:'pointer'}} title="Đăng xuất">Đăng xuất</a></h5></div>):(<h5 className="text-center" onClick={this.loginAction}><a style={{cursor:'pointer'}} title="Đăng nhập" >Đăng nhập</a></h5>)}
						
					</div>
					<div className="btn-quay">
						<h5 className="text-center">Còn: {turnsFree} lượt &nbsp;<a className="small" href="#" title="Thêm lượt" data-toggle="modal" data-target="#myModal10"><u>Thêm lượt</u></a></h5>
						<a style={{cursor:'pointer'}} onClick={this.btnStart}><img src={btn_quay_p2} alt="" className="img-fluid hv" /></a>
						<div className="custom-control custom-checkbox">
							<input type="checkbox" className="custom-control-input" id="customCheck" name="autospin" />
							<label className="custom-control-label" for="customCheck" onClick={this.handleChange}>Chọn quay tự động</label>
						</div>
					</div>   
				</div>
				
				<div className="menu-right">
					<ul className="nav flex-column">
						<li className="pt-6"><a style={{color:"#fff", cursor:'pointer'}} title="Tủ đồ" onClick={this.showModalTuDo}>Tủ đồ</a>{notification_tudo}</li>
						<li className="pt-5a"><a style={{color:"#fff", cursor:'pointer'}} title="Mã dự thưởng" onClick={this.showModalCodeBonus}>Mã dự thưởng</a>{notification_mdt}</li>
					</ul>
				</div>
			</div>
			{/* End p2 */}

			<div className="container jumbotron">
				<div class="bg-ketquaquayso">
					<h2 class="d-block text-center text-white text-kqqs display-6 mb-0" style={{fontSize:'2vw'}}>Kết quả quay số</h2>
					<h4 class="text-center text-white" style={{fontSize:'2vw'}}>Tự động cập nhật theo KQ so Mã dự thưởng vào lúc 16:00 ngày 01/11/2019</h4>
					<div class="row px-5">
						<div class="col-6 align-content-center text-center pl-3">
							<h2 class="text-center pt-4 color-kqqs" style={{fontSize:'2vw'}}>GIẢI ĐẶC BIỆT <br />iPhone 11 Pro Max</h2>
							<img src={iphone_11_pro_max} width="70%" class="img-fluid text-center" />
						</div>
						<div class="col-6 mstt">
							<h2 class="text-center color-kqqs" style={{fontSize:'2vw'}}>Mã số trúng thưởng<br /> 
							<label class="form-control form-control form-control-sm bg-secondary" /></h2>
							
						</div>
					</div>
				</div>
				<h2 id="bvd" className="d-block btn-ketqua mt-5"><img src={icon_bangvinhdanh} alt="icon" />Bảng vinh danh</h2>
				<div className="table-responsive mt-4">
					<table className="table table-borderless tbl-bvd mx-auto text-center">
						<thead>
						<tr className="text-uppercase title-bvd">
							<th></th>
							<th>Tên</th>
							<th>Phần thưởng</th>
							<th>Thời gian trúng</th>
						</tr>
						</thead>
						<tbody className="top-12">
						<tr>
							<td></td>
							<td>Chưa có</td>
							<td>iphone 11 Pro Max 256GB</td>
							<td>Chưa có</td>
						</tr>
						</tbody>
					</table>
					<table className="table table-bordered tbl-bvd mx-auto text-center">            
						<tbody className="top100">
							{listVinhDanh.map((obj, key) => (
								<tr key={key}>
									<td className="border-right-0">{obj.userName}</td>
									<td className="border-left-0 border-right-0">{obj.itemName}</td>
									<td className="border-left-0">{obj.date}</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="pagination justify-content-center pag-custom">
						<Pagination
							activePage={activeVinhDanh}
							itemsCountPerPage={10}
							totalItemsCount={countVinhDanh}
							pageRangeDisplayed={numberPage}
							lastPageText={'Trang cuối'}
							firstPageText={'Trang đầu'}
							itemClass={"page-item"}
							linkClass={"page-link"}
							onChange={(v) => this.handlePageChangeVinhDanh(v)}
						/>
					</div> 
				</div>
				<div className="w-100 justify-content-center text-center pt-5">
					<ul className="nav nav-pills nav-justified">
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="https://daily.scoin.vn/huong-dan-mua-the/" title="Hướng dẫn mua thẻ scoin" target="_blank">Hướng dẫn mua thẻ scoin</a>
						</li>
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="https://www.facebook.com/scoinvtcmobile/" title="Nhận thông báo sk" target="_blank">Nhận thông báo sk</a>
						</li>
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="http://scoin.vn/nap-tien" title="Nạp scoin" target="_blank">Nạp scoin</a>
						</li>
						<li className="nav-item">
						<a className="nav-link btn-dv text-uppercase text-nowrap" href="tel:19001104" title="Hotline hỗ trợ">HOT LINE: 19001104</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="button-bt">
				<button type="button" className="btn fixed-bottom btn-dv btn-block" onClick={this.showPopupLiveStream}><h5 className="glow mb-0"><img src={spin} width="24" className="pr-1" alt=""/> Xem livestream so Mã dự thưởng tại đây sau: {hour_live}giờ&nbsp;&nbsp;{minute_live}phút&nbsp;&nbsp;{second_live}giây </h5></button>
			</div>


			<div className="container-fluid footer">
				<p className="text-center"><img src={logo_splay} width="100" alt="" /> <img src={logo_scoin} width="150" hspace="10" alt="" /></p>
				<p className="text-center"><span className="text-uppercase">CÔNG TY CỔ PHẦN VTC DỊCH VỤ DI ĐỘNG</span> <br />VTC Mobile - Thành viên của Tổng Công ty Truyền thông đa phương tiện Việt Nam VTC <br /> Tầng 11, tòa nhà VTC Online, số 18 Tam Trinh, phường Minh Khai, quận Hai Bà Trưng, Hà Nội.
<br />Tel: (84-4).39877470 <br />Fax: 84-4).39877210<br /> <a href="mailto:vtcmobile@vtc.vn">vtcmobile@vtc.vn</a>
	</p>
			</div>

			{/* The Modal Phần thưởng */}
			<div className="modal fade" id="myModal">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_phanthuong} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="card-deck">
						<div className="card">
							<div className="card-body text-center" style={{padding:"0rem"}}>
							<h3 className="card-title text-uppercase title-giaidacbiet">Giải đặc biệt</h3>
							<p className="card-text title-giaidacbiet">Xe máy Honda Airblade 2019</p>
							<div className="bg-giaithuong d-table-cell align-middle justify-content-center w-100">
								<img src={honda} alt="Xe máy" className="img-fluid" />
							</div>
							<h5 className="card-title">TRỊ GIÁ: 42.000.000 <br /> Số lượng giải: 01</h5>
							</div>
						</div>
						<div className="card">
							<div className="card-body text-center" style={{padding:"0rem"}}>
							<h3 className="card-title text-uppercase title-giaidacbiet">Giải nhất</h3>
							<p className="card-text title-giaidacbiet">Xiaomi Black Shark 2</p>
							<div className="bg-giaithuong d-table-cell align-middle">
								{/* <img src={xiaomi_black} alt="Iphone" className="img-fluid" /> */}
							</div>
							<h5 className="card-title">TRỊ GIÁ: 10.000.000 <br /> Số lượng giải: 01</h5>
							</div>
						</div>      
						</div>
						<h3 className="card-title text-uppercase title-giaidacbiet text-center">Các giải khác</h3>
						<div className="card-deck">
						<div className="card">
							<div className="card-body text-center item-giaikhac" style={{padding:"0rem"}}>              
							<div className="bg-giaithuong d-table-cell align-middle h-auto py-4">
								<img src={img_card10k} alt="Thẻ 10k" className="img-fluid mt-2" />
								<p className="text-giaikhac">Tặng thẻ 10.000đ vào Tủ đồ SK <br />Số lượng giải: 1000</p>
							</div>              
							</div>
						</div>          
						<div className="card">
							<div className="card-body text-center item-giaikhac" style={{padding:"0rem"}}>              
							<div className="bg-giaithuong d-table-cell align-middle h-auto py-4">
								<img src={img_card50k} alt="Thẻ 50k" className="img-fluid mt-2" />
								<p className="text-giaikhac">Tặng thẻ 50.000đ vào Tủ đồ SK <br />Số lượng giải: 200</p>
							</div>             
							</div>
						</div>
						<div className="card">
							<div className="card-body text-center item-giaikhac" style={{padding:"0rem"}}>              
							<div className="bg-giaithuong d-table-cell align-middle h-auto py-4">
								<img src={img_card100k} alt="Thẻ 100k" className="img-fluid mt-2" />
								<p className="text-giaikhac">Tặng thẻ 100.000đ vào Tủ đồ SK <br />Số lượng giải: 60</p>
							</div>              
							</div>
						</div>
						<div className="card">
							<div className="card-body text-center item-giaikhac" style={{padding:"0rem"}}>              
							<div className="bg-giaithuong d-table-cell align-middle h-auto py-4">
								<img src={img_card500k} alt="Thẻ 500k" className="img-fluid mt-2" />
								<p className="text-giaikhac">Tặng thẻ 500.000đ vào Tủ đồ SK <br />Số lượng giải: 30</p>
							</div>              
							</div>
						</div>     
						</div>
						
					</div>

					</div>
				</div>
			</div>

			{/* The Modal Thể lệ */}
			<div className="modal fade" id="myModal1">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thele} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<h3 className="text-purple">I. Đối tượng tham gia</h3>
						<p className="text-thele">Khách hàng có tài khoản Scoin. Nếu chưa có, đăng ký <code><a href="https://scoin.vn/thong-tin-ca-nhan" title="Đăng ký" target="_blank">tại đây</a></code>. <br />
				Xác minh tài khoản Scoin tại đây nếu chưa thực hiện. <br />
				Nạp thẻ Scoin bất kỳ mệnh giá trong thời gian từ  00:01 19/08 - 23:59 25/08/2019.</p>
						<h3 className="text-purple">II. Cách thức tham gia sự kiện</h3>
						<div style={{display:'flex'}}>
							{/* <div className="bg-orange px-0 py-2 text-center" style={{borderRadius: 4, flex:1}}>Đăng nhập Scoin <br />+<br /> Xác thực số điện thoại</div>
							<div className="align-self-center" style={{flexGrowgrow: 0, padding: 0}}><span>></span></div>
							<div className="bg-orange px-0 py-2 text-center" style={{borderRadius: 4, flex:1}}>Nạp ví/Nạp game (Dùng Scoin) <br />+<br /> Nhận lượt chơi</div>
							<div className="align-self-center" style={{flexGrowgrow: 0, padding: 0}}><span>></span></div>
							<div className="bg-orange px-0 py-2 text-center" style={{borderRadius: 4, flex:1}}>Chơi vòng quay <br />+<br /> Nhận mã dự thưởng</div>
							<div className="align-self-center" style={{flexGrowgrow: 0, padding: 0}}><span>></span></div>
							<div className="bg-orange px-0 py-2 text-center" style={{borderRadius: 4, flex:1}}>So mã dự thưởng với KQXS vào lúc 18h30' ngày 08/08/2019</div> */}
							<div className="col-4 bg-orange py-2 text-center border border-white rounded-lg"><button type="button" className="btn btn-primary d-block mx-auto mb-3">Bước 1</button><p className="text-dark">Nạp ví/ Nạp game(dùng Scoin)</p> <p className="font-weight-bold text-success my-1">&nabla;</p> <p className="text-dark">Nhận lượt chơi</p></div>          
          					<div className="col-4 bg-orange py-2 text-center border border-white rounded-lg"><button type="button" className="btn btn-info d-block mx-auto mb-3">Bước 2</button><p className="text-dark">Chơi vòng quay </p> <p className="font-weight-bold text-success my-1">&nabla;</p> <p className="text-dark">Nhận mã dự thưởng</p></div>          
          					<div className="col-4 bg-orange py-2 text-center border border-white rounded-lg"><button type="button" className="btn btn-success d-block mx-auto mb-3">Bước 3</button><p className="text-dark">So mã dự thưởng với KQ XSMB <br /> 18:30 ngày 26/08/2019</p></div>  
						</div>
						<p className="text-thele pt-3">Bước 1: Đăng nhập tài khoản Scoin <code><a href="https://scoin.vn/thong-tin-ca-nhan" title="Đăng ký" target="_blank">tại đây</a></code> và thực hiện nạp tiền qua kênh thẻ cào Scoin. <br />
				Bước 2: Nhận lượt quay miễn phí, tương ứng với thẻ Scoin nạp thành công:</p>
						<div className="table-responsive">
							<table className="table table-bordered text-center text-thele">
								<thead>
								<tr>
									<th>STT</th>
									<th>Mệnh giá thẻ Scoin (VNĐ)</th>
									<th>Số lượt quay</th>
								</tr>
								</thead>
								<tbody>
								<tr>
									<td>1</td>
									<td>10.000</td>
									<td>1</td>
								</tr>
								<tr>
									<td>2</td>
									<td>20.000</td>
									<td>2</td>
								</tr>
								<tr>
									<td>3</td>
									<td>50.000</td>
									<td>5</td>
								</tr>
								<tr>
									<td>4</td>
									<td>100.000</td>
									<td>11</td>
								</tr>
								<tr>
									<td>5</td>
									<td>200.000</td>
									<td>22</td>
								</tr>
								<tr>
									<td>6</td>
									<td>300.000</td>
									<td>33</td>
								</tr>
								<tr>
									<td>7</td>
									<td>500.000</td>
									<td>55</td>
								</tr>
								<tr>
									<td>8</td>
									<td>1.000.000</td>
									<td>120</td>
								</tr>
								<tr>
									<td>9</td>
									<td>2.000.000</td>
									<td>240</td>
								</tr>
								<tr>
									<td>10</td>
									<td>5.000.000</td>
									<td>600</td>
								</tr>
								</tbody>
							</table>
						</div>
						<p className="text-thele">Bước 3: Tham gia vòng quay để nhận Mã dự thưởng & thẻ Scoin. <br />
				Bước 4: Mã dự thưởng dùng để đối chiếu với KQ XSMB ngày 26/08/19 để xác định trúng thưởng:</p>
						<div className="table-responsive">
							<table className="table table-bordered w-100 text-center text-thele">
								<thead>
								<tr>
									<th>Giải đặc biệt</th>
									<th>Xe máy Honda Airblade 2019</th>
								</tr>
								<tr>
									<th>Giải nhất</th>
									<th>Xiaomi Black Shark 2</th>
								</tr>
								</thead>
							</table>
						</div>
						<h3 className="text-purple">III. Cách thức nhận giải thưởng</h3>
						<p className="text-thele">Đối với phần thưởng là thẻ Scoin: sẽ được lưu trữ trong Tủ đồ sự kiện. Khách hàng có thể
				xem và sử dụng trực tiếp để nạp điện thoại hoặc nạp vào các game của VTC Mobile.
				Đối với phần thưởng là Mã dự thưởng: Sau khi kết quả XSMB ngày 26/08/2019 được
				công bố, BTC sẽ cập nhật thông tin của khách hàng trúng thưởng trong Bảng vinh danh.
				Khách hàng trúng giải liên hệ Hotline <a style={{textDecoration:'underline'}} href="tel:19001104" title="Hotline hỗ trợ">19001104</a> để được hướng dẫn lên nhận thưởng
				trực tiếp tại trụ sở Công ty cổ phần VTC Dịch vụ di động - tầng 11, tòa nhà VTC Online,
				số 18 Tam Trinh, Hai Bà Trưng, Hà Nội.</p>
						<p className="text-thele"><code>Lưu ý:</code> Khi đến nhận giải thưởng, khách hàng cần đem theo giấy tờ tùy thân (CMND/ CCCD/ Hộ chiếu còn hiệu lực.</p>
						<p className="text-thele">Theo khoản 6, điều 3, chương 1 của Luật thuế thu nhập cá nhân, những người may mắn
				trúng giải thưởng hiện vật có giá trị kinh tế cao có nghĩa vụ nộp thuế theo quy định của
				Nhà nước. Thông tin chi tiết xem <code><a href="https://www.mof.gov.vn/webcenter/portal/mttpltc/r/m/pchtrphlu/pchtrthtu/pchtrthtu_chitiet;jsessionid=ThZz4VGQnL0QgNbLB0nacaTsM1vAIiOZGx9z8hGOoXitxa62VKmY!304837975!1847050008?centerWidth=100%25&dDocName=BTC260955&dID=31536&leftWidth=0%25&rightWidth=0%25&showFooter=false&showHeader=false&_adf.ctrl-state=1a8d3rpn02_4&_afrLoop=75399789223796617#!%40%40%3F_afrLoop%3D75399789223796617%26centerWidth%3D100%2525%26dDocName%3DBTC260955%26dID%3D31536%26leftWidth%3D0%2525%26rightWidth%3D0%2525%26showFooter%3Dfalse%26showHeader%3Dfalse%26_adf.ctrl-state%3D6d4nwzwwd_4" title="Luật thuế" target="_blank">tại đây</a></code>.</p>
						<h3 className="text-purple">IV. Thời gian trao thưởng</h3>
						<p className="text-thele">Công ty cổ phần VTC Dịch vụ di động sẽ trao giải thưởng cho khách hàng chậm nhất
				sau 15 ngày làm việc kể từ khi kết thúc sự kiện.</p>
						<p className="text-thele"><code>Lưu ý:</code> Trong tất cả các trường hợp, quyết định của Công ty cổ phần VTC Dịch vụ di động
				là quyết định cuối cùng. Mọi trường hợp gian lận hoặc không trung thực sẽ bị xử lý
				theo pháp luật.</p>
						
					</div>

					</div>
				</div>
			</div>


			{/* The Modal Tủ đồ */}
			<div className="modal fade" id="myModal2" style={{zIndex:10001}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_tudo} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">
							<table className="table table-bordered mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
								<thead>
								<tr className="text-uppercase lead">
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Phần thưởng</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Nội dung</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Thời gian trúng</th>
								</tr>
								</thead>            
								<tbody className="popup-tudo">
									{listTuDo.map((obj, key) => (
										<tr key={key}>
											<td className="border-right-0">{obj.itemName}</td>
											<td className="border-left-0 border-right-0">{obj.description}</td>
											<td className="border-left-0">{obj.date}</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className="pagination justify-content-center pag-custom">
								<Pagination
									activePage={activeTuDo}
									itemsCountPerPage={numberItemInpage}
									totalItemsCount={countTuDo}
									pageRangeDisplayed={numberPage}
									lastPageText={'Trang cuối'}
									firstPageText={'Trang đầu'}
									itemClass={"page-item"}
									linkClass={"page-link"}
									onChange={(v) => this.handlePageChangeTuDo(v)}
								/>
							</div> 
						</div>
						
					</div>

					</div>
				</div>
			</div>


			{/* The Modal Mã dự thưởng */}
			<div className="modal fade" id="myModal3" style={{zIndex:10002}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_maduthuong} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">Tìm kiếm</span>
								</div>
								<input type="text" className="form-control" placeholder="Nhập mã dự thưởng" onChange={e => this.findCode(e)}/>
							</div>
							<table className="table table-bordered mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
								<thead>
								<tr className="text-uppercase lead">
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Mã</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Nội dung</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Thời gian trúng</th>
								</tr>
								</thead>            
								<tbody className="popup-tudo">
								{listCodeBonus.map((obj, key) => (
									<tr key={key}>
										<td className="border-right-0">{obj.description}</td>
										<td className="border-left-0 border-right-0">{obj.itemName}</td>
										<td className="border-left-0">{obj.date}</td>
									</tr>
								))}
								</tbody>
							</table>
							<div className="pagination justify-content-center pag-custom">
								<Pagination
									activePage={activeCodeBonus}
									itemsCountPerPage={numberItemInpage}
									totalItemsCount={countCodeBonus}
									pageRangeDisplayed={numberPage}
									lastPageText={'Trang cuối'}
									firstPageText={'Trang đầu'}
									itemClass={"page-item"}
									linkClass={"page-link"}
									onChange={(v) => this.handlePageChangeCodeBonus(v)}
								/>
							</div> 
							<p className="text-thele">Lưu ý: Tài khoản Scoin của quý khách cần phải xác thực số ĐT để nhận thông báo trong trường hợp trúng giải. <code><a style={{fontSize:18}} href=" https://scoin.vn/doi-sdt" title="Xác thực ngay" target="_blank">Xác thực ngay</a></code> </p>
						</div>
						
					</div>

					</div>
				</div>
			</div>

			{/* The Modal Thông báo chúc mừng */}
			<div className="modal" id="myModal4">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

					{/* <!-- Modal body --> */}
						<div className="modal-body bg-chucmung justify-content-center">
							<div className="card">
								<div className="card-body content-chucmung mx-auto">
									{(code)?(
									<div>
										<div className="text-chucmung text-center" style={{marginTop:70}}>
											<span className="text-white">Bạn vừa quay vào ô</span>
											<span className="pt-1 d-block">Mã số dự thưởng Xe máy Honda Air Blade và Điện thoại iPhone XS Max đã được lưu trong Mã dự thưởng.</span>
										</div>
									
										<p className="small pt-2 mb-2 text-center">So Mã số dự thưởng với KQ XSMB vào lúc 18:30 ngày 26/08/2019.<br /><label title="Xem phần thưởng" className="underline pt-2 d-block" style={{color:"#fff", cursor:'pointer'}} onClick={this.showModalCodeBonus}>Xem phần thưởng</label></p>
										<button type="button" className="btn btn-xacnhan text-white btn-block text-center" onClick={this.hideModalDetailBonus}>Xác nhận</button>
									</div>
									):(
									<div><div className="text-chucmung text-center" style={{marginTop:70}}>
											<span className="text-white">Bạn vừa quay vào ô</span>
											<span className="pt-1 d-block"><img src={itemBonus.urlImage} alt="" /></span>
										</div>
										<p className="small pt-2 mb-2 text-center">(Phần thưởng đã được chuyển vào tủ đồ sự kiện) <br /><label title="Xem phần thưởng" className="underline pt-2 d-block" style={{color:"#fff", cursor:'pointer'}} onClick={this.showModalTuDo}>Xem phần thưởng</label></p>
										<button type="button" className="btn btn-xacnhan text-white btn-block text-center" onClick={this.hideModalDetailBonus}>Xác nhận</button>
										</div>
									)}	
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo đăng nhập--> */}
			<div className="modal fade" id="myModal5">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">Xin vui lòng đăng nhập!</h5>
							<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={this.loginAction}>Đăng nhập</button>
						</div>       
					</div>

					</div>
				</div>
			</div>

			{/* <!-- The Modal Thông báo đăng nhập--> */}
			<div className="modal fade" id="myModal6" style={{zIndex:10002}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">Bạn đã hết lượt quay!</h5>
							<p className="text-thele lead text-center">Hãy nạp Scoin để nhận thêm lượt chơi Vòng quay tháng 8.</p>
							<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={()=>this.openTabNapScoin('http://scoin.vn/nap-tien')}>Nạp Scoin</button>
						</div>       
					</div>

					</div>
				</div>
			</div>

			<div className="modal fade" id="myModal8">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					{/* <!-- Modal Header --> */}
					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>

					{/* <!-- Modal body --> */}
					<div className="modal-body">
						<div className="table-responsive mt-2">              
							<h5 className="text-thele lead text-center">{message_status}</h5>
						</div>       
					</div>

					</div>
				</div>
			</div>


			<div className="modal fade" id="myModal9" data-keyboard="false" data-backdrop="static" style={{zIndex:10000}}>
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button className="close" onClick={this.closePopupAuto}><img src={btn_close} alt="Đóng" /></button>
					</div>

					<div className="modal-body">
						<div className="table-responsive mt-2">
							<h3 className="text-purple text-center">Kết quả quay tự động</h3>
							<ol className="list-group list-group-flush">
								{data_auto.map((obj, key) => (
									<li className="list-group-item" key={key}>{key+1}. {obj}</li>
								))}
							</ol> 
							
							<p className="text-thele">Vào <code><label onClick={this.showModalTuDo}>Tủ đồ</label></code> hoặc <code><label onClick={this.showModalCodeBonus}>Mã dự thưởng</label></code> để xem chi tiết.</p>
							<p className="text-thele text-center"><code>Đang quay tự động <span className="spinner-grow spinner-grow-sm"></span></code></p>
						</div>
						
					</div>

					</div>
				</div>
			</div>

			<div className="modal fade" id="myModal10">
				<div className="modal-dialog">
					<div className="modal-content popup-phanthuong">

					<div className="modal-header border-bottom-0">
						<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
						<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
					</div>
					<div className="modal-body">
						<div className="table-responsive mt-2">
							<h3 className="text-purple text-center">Thêm lượt? <br />Nạp Ví hoặc Nạp Game dùng thẻ Scoin</h3>
							<table className="table table-striped mx-auto text-center" style={{color:"#282652", width:"99%"}}> 
								<thead>
								<tr className="text-uppercase">
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">STT</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Mệnh giá thẻ Scoin (VNĐ)</th>
									<th className="border-bottom-0 border-left-0 border-right-0 border-top-0">Số lượt quay</th>
								</tr>
								</thead>            
								<tbody className="popup-tudo">
								<tr>
									<td>1</td>
									<td >10.000</td>
									<td>1</td>
								</tr>
								<tr>
									<td>2</td>
									<td>20.000</td>
									<td>2</td>
								</tr>
								<tr>
									<td>3</td>
									<td>50.000</td>
									<td>5</td>
								</tr>
								<tr>
									<td>4</td>
									<td >100.000</td>
									<td>11</td>
								</tr>
								<tr>
									<td>5</td>
									<td>200.000</td>
									<td>22</td>
								</tr>
								<tr>
									<td>6</td>
									<td>300.000</td>
									<td>33</td>
								</tr>
								<tr>
									<td>7</td>
									<td >500.000</td>
									<td>55</td>
								</tr>
								<tr>
									<td>8</td>
									<td>1.000.000</td>
									<td>120</td>
								</tr>
								<tr>
									<td>9</td>
									<td>2.000.000</td>
									<td>240</td>
								</tr>
								<tr>
									<td>10</td>
									<td>5.000.000</td>
									<td>600</td>
								</tr>
								</tbody>
							</table>              
							<button type="button" className="btn btn-xacnhan text-white btn-block text-center" onClick={()=>this.openTabNapScoin('http://scoin.vn/nap-tien')}>Nạp</button>
						</div>
						
					</div>

					</div>
				</div>
				</div>

				<div className="modal fade" id="myModal11">
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">

						{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

						{/* <!-- Modal body --> */}
						<div className="modal-body">
							<div className="table-responsive mt-2">              
								<h5 className="text-thele lead text-center">{message_error}</h5>
							</div>       
						</div>

						</div>
					</div>
				</div>
				<div className="modal fade" id="myModal12">
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">

						{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

						{/* <!-- Modal body --> */}
						<div className="modal-body">
							<div className="table-responsive mt-2">              
								<h5 className="text-thele lead text-center">Thông báo bảo trì!</h5>
								<h5 className="text-thele lead text-center">Hệ thống đang được nâng cấp để tối ưu. Vui lòng quay lại sau 10 phút.</h5>
								<h5 className="text-thele lead text-center">Xin lỗi vì sự bất tiện này</h5>
								<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={this.closeServerErr}>Xác nhận</button>
							</div>       
						</div>

						</div>
					</div>
				</div>

				<div className="modal fade" id="myModal13">
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">

						{/* <!-- Modal Header --> */}
						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_thongbao} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

						{/* <!-- Modal body --> */}
						<div className="modal-body">
							<div className="table-responsive mt-2">           
								<h5 className="text-thele lead text-center">Kết quả trúng thưởng 2 giải Xe máy Airblade 2019 & điện thoại Xiaomi Black Shark 2 sẽ được công bố sau ngày 26/08/2019.</h5>
								<h5 className="text-thele lead text-center">Đón xem live stream buổi so mã Dự thưởng vào lúc 17:30 - 19:00 ngày 26/08 trang sự kiện này hoặc tại fanpage Scoin: <a href="https://www.facebook.com/scoinvtcmobile/">https://www.facebook.com/scoinvtcmobile/</a></h5>
								<h5 className="text-thele lead text-center">BTC trân trọng thông báo.</h5>
								<button type="button" className="btn btn-xacnhan text-white btn-block text-center py-4" onClick={this.closePopupFinish}>Xác nhận</button>
							</div>       
						</div>

						</div>
					</div>
				</div>

				<div className="modal fade" id="myModal14">
					<div className="modal-dialog">
						<div className="modal-content popup-phanthuong">

						<div className="modal-header border-bottom-0">
							<h4 className="modal-title w-100 text-center"><img src={img_livestream} alt="" /></h4>
							<button type="button" className="close" data-dismiss="modal"><img src={btn_close} alt="Đóng" /></button>
						</div>

						<div className="modal-body">
								{/* <div className="facebook-responsive">
									<iframe src={linkLiveStream} width="560" height="315" style={{border:'none', overflow:'hidden'}} scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>
								</div>      */}
						</div>

						</div>
					</div>
				</div>
				<ReactResizeDetector handleWidth={true} handleHeight={true} onResize={this.onResize} />


		</div>)
	}
}

const mapStateToProps = state => ({
	dataProfile: state.profile.data,
	dataRotation:state.lucky.dataRotation,
	dataRotationWithUser:state.lucky.dataRotationWithUser,
	dataPick: state.lucky.dataPick,
	dataDetail: state.lucky.dataDetail,
	dataTurn: state.lucky.dataTurn,
	dataTuDo: state.lucky.dataTuDo,
	dataVinhDanh: state.lucky.dataVinhDanh,
	dataCodeBonus: state.lucky.dataCodeBonus,
	server:state.server.serverError,
	waiting: state.lucky.waiting,
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getDetailData,
	getRotationDetailData,
	getRotationDetailDataUser,
	pickCard,
	buyTurn,
	getData,
	getTuDo,
	getCodeBonus,
	getVinhDanh,
}, dispatch)


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lucky_Rotation)