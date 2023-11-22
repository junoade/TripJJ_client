<script setup>
import { ref, watch, onMounted } from "vue";

var map;      // 반응형으로 만들면 에러 발생!!!!!!!
const positions = ref([]);
const markers = ref([]);
var currentLocMarker;   // 사용자가 임의로 찍은 마커
var targetOverlay;      // 관광지 마커 중 사용자가 찍은 마커
var geocoder;           // 좌표 => 주소 변환 객체

const isOverlayOn = ref(false);
const currentTitle = ref('');

const props = defineProps({
  attractions: Array,
  selectedAttraction: Object
});

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY
    }&libraries=services,clusterer`;
    
    /* global kakao */
    script.onload = () => kakao.maps.load(() => initMap());
    document.head.appendChild(script);
  }
});

watch(
  () => props.selectedAttraction.value,
  () => {
    console.log("이동: ", props.selectedAttraction)
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(props.selectedAttraction.latitude, props.selectedAttraction.longitude);

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
  },
  { deep: true }
);

watch(
  () => props.attractions.value,
  () => {
    console.log("초기 마커 생성: ", props.attractions)
    positions.value = [];
    props.attractions.forEach((attraction) => {
      // console.log("마커 : ", attraction);
      let obj = {};
      obj.latlng = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);
      obj.title = attraction.title;
      obj.img = attraction.firstImage;
      obj.desc = attraction.overview;
      // obj.desc = "test"
      positions.value.push(obj);
    });
    loadMarkers(); 
  },
  { deep: true }  // 배열 내 내용이 바뀌면 깊은 감시 필요
);

// 지도 초기화
const initMap = () => {
  console.log(props.attractions, props.selectedAttraction);
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  map = new kakao.maps.Map(container, options);

  // // 좌표 => 주소 변환 객체 생성
  // geocoder = new kakao.maps.services.Geocoder();

  // // 지도 클릭 시 해당 위치에 사용자 지정 마커 추가
  // console.log("마커 생성 이벤트 등록!")
  // kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

  //   // 이전에 찍은 사용자 지정 마커 제거
  //   if(currentLocMarker) currentLocMarker.setMap(null);

  //   // 사용자 지정 마커 생성
  //   currentLocMarker = new kakao.maps.Marker({
  //     position: mouseEvent.latLng
  //   });

  //   // 마커가 지도 위에 표시되도록 설정
  //   console.log("마커 생성! ", mouseEvent.latLng);
  //   currentLocMarker.setMap(map);

  //   // 클릭한 좌표의 지번 주소 얻어오기
  //   geocoder.coord2Address(mouseEvent.latLng.getLng(), mouseEvent.latLng.getLat(), function (result, status) {
  //     console.log(result[0].address.address_name)
  //   });
  // });
};

const loadMarkers = () => {
  // 지도 내 마커와 오버레이 제거
  deleteMarkers();
  if (targetOverlay) targetOverlay.setMap(null);

  // 마커를 생성
  markers.value = [];
  positions.value.forEach((position) => {

    // 마커 생성 및 추가
    const marker = new kakao.maps.Marker({
      map: map,                   // 마커를 표시할 지도. market.setMap(map) 생략 가능
      position: position.latlng,  // 마커를 표시할 위치
      title: position.title,      // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됨.
      clickable: true,            // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
      // image: markerImage,         // 마커의 이미지
    });
    markers.value.push(marker);

    // 마커 클릭 이벤트 추가
    kakao.maps.event.addListener(marker, 'click', function() {
      // 마커 위에 인포윈도우를 표시합니다
      if (targetOverlay) targetOverlay.setMap(null);    

      // 커스텀 오버레이
      let content = '';

      if (currentTitle.value === position.title && isOverlayOn.value) {
        isOverlayOn.value = false;
      }
      else {
        content = document.createElement('div');
        content.className = 'overlay';
        content.innerHTML = 
        '<div class="wrap">' + 
        ' <div class="info">' + 
        '   <div class="title">' + 
              position.title  + 
        '   </div>' + 
        '   <div class="body">' +
        '     <div class="desc">' + 
        '       <div>' + position.desc + '</div>'
        '     </div>' + 
        '   </div>' +
        ' </div>' +
          '</div>';
        if (currentTitle.value != position.title) {
          currentTitle.value = position.title;   
        }
        isOverlayOn.value = true;

        addEventHandle(content, 'wheel', function () {      // 오버레이 내 지도 스크롤 방지
          kakao.maps.event.preventMap();
        })
        addEventHandle(content, 'mousedown', function () {  // 오버레이 내 지도 클릭 방지1
          kakao.maps.event.preventMap();
        });
        addEventHandle(document, 'mouseup', null);   // 오버레이 내 지도 클릭 방지2

        // target node에 이벤트 핸들러 등록
        function addEventHandle(target, type, callback) {
          if (target.addEventListener) {
            target.addEventListener(type, callback);
          } else {
            target.attachEvent('on' + type, callback);
          }
        }
      }
      console.log("관광지 마커 클릭!", currentTitle.value, isOverlayOn.value);

      // 마커 위에 커스텀오버레이를 표시합니다
      // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
      targetOverlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition(),
      });
    });
  });

  // 4. 지도를 이동시켜주기
  // 배열.reduce( (누적값, 현재값, 인덱스, 요소)=>{ return 결과값}, 초기값);
  const bounds = positions.value.reduce(
    (bounds, position) => bounds.extend(position.latlng),
    new kakao.maps.LatLngBounds()
  );

  map.setBounds(bounds);
};

const deleteMarkers = () => {
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }
};

</script>

<template>
  <div id="map"></div>
</template>

<style>
#map {
  width: 100%;
  height: 100%;
}

/* modal 관련 */
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  margin-left: -144px;
  overflow: hidden;
  font-size: 12px;
  font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
  line-height: 1.5;
  border-width: thin;
  border-color: black;
  /* text-align: center; */
}
.wrap .info {
  height: auto;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.info .title {
  padding: 5px 3px 5px 3px;  /* 위 오른쪽 아래 왼쪽 */
  height: auto;
  background: #c3c6f0;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  white-space: normal;
  word-break: keep-all;
  text-align: center;
}
.info .body {
  max-height: 132px;
  position: relative;
  overflow-y: scroll;
  text-align: left;
}
.info .desc {
  position: relative;
  margin: 5px;
  white-space: normal;
  display: -webkit-box;
  word-break: keep-all;
}
</style>
