<script setup></script>

<template>
  <div class="text-center mt-4">
    <h1>어디로 가시나요?</h1>

  </div>
  <div class="d-flex justify-content-center p-2">
    <form class="" role="search">
        <div class="input-group">
          <input class="form-control" type="text" name="search" placeholder="Search..." required/>
          <span class="input-group-btn">
            <button class="btn btn-success" type="submit">Search</button>
          </span>
        </div>
      </form>
  </div>
  <div class="container mt-5">
    <div class="row d-flex justify-content-evenly">
        <div class="card shadow-1-strong col-3"
          style="background-image: url(https://content.r9cdn.net/rimg/dimg/30/0c/6318617a-city-35982-163ff913019.jpg?width=1366&height=768&xhint=2421&yhint=1876&crop=true);
          width: 17em; height: 20rem; border-color: white;"
        >
            <div class="card-body text-white">
                <h5 class="card-title fw-bold fs-2 p-3">서울</h5>
                <p class="card-text fw-bold fs-4 p-3">
                    350여개의 <br/>여행 관광지
                </p>
                <a href="#" class="btn btn-light mt-4 fw-bolder">둘러보기</a>
            </div>
        </div>
        <div
                class="card shadow-1-strong col-3"
                style="background-image: url(https://english.visitkorea.or.kr/public/images/2023/04/13/45cc09e6cf7641308177a8751b3ed1ca.jpg); 
                width: 17em; height: 20rem; border-color: white;"
        >
            <div class="card-body text-white">
                <h5 class="card-title fw-bold fs-2 p-3">부산</h5>
                <p class="card-text fw-bold fs-4 p-3">
                    230여개의 <br/>여행 관광지
                </p>
                <a href="#" class="btn btn-light mt-4 fw-bolder">둘러보기</a>
            </div>
        </div>
        <div
                class="card shadow-1-strong col-3"
                style="background-image: url(https://onceuponahallyu.files.wordpress.com/2018/01/gwangju.jpg?w=1200); 
                width: 17em; height: 20rem; border-color: white;"
        >
            <div class="card-body text-white">
                <h5 class="card-title fw-bold fs-2 p-3">광주</h5>
                <p class="card-text fw-bold fs-4 p-3">
                    170여개의 <br/>여행 관광지
                </p>
                <a href="#" class="btn btn-light mt-4 fw-bolder">둘러보기</a>
            </div>
        </div>
        <div
                class="card shadow-1-strong col-3"
                style="background-image: url(https://cdn.hellodd.com/news/photo/202108/93976_307091_140.jpg); 
                width: 17em; height: 20rem; border-color: white;"
        >
            <div class="card-body text-white">
                <h5 class="card-title fw-bold fs-2 p-3">제주도</h5>
                <p class="card-text fw-bold fs-4 p-3">
                    200여개의 <br/>여행 관광지
                </p>
                <a href="#" class="btn btn-light mt-4 fw-bolder">둘러보기</a>
            </div>
        </div>

    </div>
</div>

  
</template>

<style scoped></style>
