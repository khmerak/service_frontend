<template>
  <footer
    class="bg-primary text-white pt-5 pb-4 mt-auto animate__animated animate__fadeInUp"
  >
    <div class="container">
      <!-- Top section with logo and intro -->
      <div class="text-center mb-5">
        <img
          src="/images/houselogo.png"
          alt="House Cleaning Logo"
          class="mb-3 animate__animated animate__zoomIn"
          style="width: 100px; height: auto"
        />
        <h1
          class="h3 fw-normal animate__animated animate__fadeInDown animate__delay-1s"
        >
          HOUSE CLEANING SERVICE
        </h1>
        <h5
          class="fw-light mb-3 animate__animated animate__fadeInDown animate__delay-2s"
        >
          About more information you can :
        </h5>
        <a
          href="#"
          class="btn btn-light rounded-pill px-4 animate__animated animate__fadeIn animate__delay-3s"
          >Contact us</a
        >
      </div>

      <!-- Bottom section with menu, contact, social -->
      <div
        class="row border-top border-light pt-4 justify-content-around text-start animate__animated animate__fadeIn animate__delay-4s"
      >
        <div class="col-12 col-md-3 mb-4 mb-md-0">
          <h4 class="fw-normal">Menu</h4>
          <ul class="list-unstyled fw-light">
            <li>Services and Prices</li>
            <li>About</li>
            <li>Reviews</li>
            <li>For Customers</li>
          </ul>
        </div>

        <div class="col-12 col-md-3 mb-4 mb-md-0">
          <h4 class="fw-normal">Contact</h4>
          <ul class="list-unstyled fw-light">
            <li>Tel: 070 076 267</li>
            <li>Email: info@cleaningservice.com</li>
            <li>st110, TK, Phnom Penh</li>
          </ul>
        </div>

        <div class="col-12 col-md-3">
          <h4 class="fw-normal">Social</h4>
          <ul class="list-unstyled fw-light">
            <li><i class="bi bi-instagram me-2"></i> Instagram</li>
            <li><i class="bi bi-twitter me-2"></i> Twitter</li>
            <li><i class="bi bi-telegram me-2"></i> Telegram</li>
            <li><i class="bi bi-facebook me-2"></i> Facebook</li>
          </ul>
        </div>
      </div>

      <!-- Payment methods -->
      <div
        class="text-center mt-5 animate__animated animate__fadeIn animate__delay-5s"
      >
        <h5 class="fw-normal mb-3">Accepted Payment Methods</h5>
        <div class="d-flex justify-content-center gap-3 flex-wrap">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
            alt="Visa"
            style="height: 30px"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            alt="MasterCard"
            style="height: 30px"
          />
          <!-- PayPal -->
          <img
            src="https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png"
            alt="PayPal"
            style="height: 30px"
          />

          <!-- Apple Pay -->
          <img
            src="https://i.pcmag.com/imagery/reviews/02RJy7OTtPnQQjh37yQDNqx-15..v1598973550.png"
            alt="Apple Pay"
            style="height: 30px"
          />

          <!-- Google Pay -->
          <img
            src="https://pplinksecurities.com.kh/wp-content/uploads/2021/08/acleda-logo.jpg"
            alt="acleda"
            style="height: 30px"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

footer {
  min-height: 400px;
}

ul li {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
}

.bi {
  font-size: 1.25rem;
  color: #fff;
}

img[alt="Visa"],
img[alt="MasterCard"],
img[alt="PayPal"],
img[alt="Apple Pay"],
img[alt="acleda Pay"] {
  filter: brightness(1) invert(0);
}
</style>
