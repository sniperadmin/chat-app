<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Yalla Chat Sign In</h5>
            <hr class="my-4">
            <button @click="loginGoogle" class="btn btn-lg btn-google text-uppercase mb-4"
              type="submit">
              <font-awesome-icon :icon="[ 'fab', 'google-plus-g' ]" class="mr-2">
              </font-awesome-icon> Sign in with Google
            </button>
            <b-card no body>
            <b-tabs pills align="center" justified card>

              <b-tab title="Login" active>
                <b-card-text>
                  <form @submit.prevent="login" autocomplete="off">

                    <b-form-group label-cols-sm="3" label="E-mail:" label-align-sm="right"
                      label-for="e-mail">
                      <b-form-input id="e-mail" v-model="email"></b-form-input>
                    </b-form-group>

                    <b-form-group label-cols-sm="3" label="Password:" label-align-sm="right"
                      label-for="password">
                      <b-form-input type="password" id="password" v-model="password"></b-form-input>
                    </b-form-group>


                    <small class="text-danger" v-if="boo">{{ boo }}</small>
                    <div class="text-center">
                      <b-button type="submit">Login</b-button>
                    </div>
                  </form>
                </b-card-text>
              </b-tab>

              <b-tab title="Register">
                <b-card-text>

                  <!-- Code for Registration Form Here -->

                  <article class="card-body mx-auto" style="max-width: 400px;">
                    <h4 class="card-title mt-3 text-center">Create Account</h4>
                    <p class="text-center">Get started with your free account</p>
                    <p>
                      <a class="btn btn-block btn-twitter white-text" href=""> <i
                          class="fab fa-twitter"></i> &nbsp; Login via
                        Twitter</a>
                      <a class="btn btn-block btn-facebook white-text" href=""> <i
                          class="fab fa-facebook-f"></i> &nbsp; Login
                        via facebook</a>
                    </p>
                    <p class="divider-text">
                      <span>OR</span>
                    </p>
                    <form @submit.stop.prevent="register" autocomplete="off">

                      <b-form-group id="example-input-group-1" label="Email:" label-for="email-form"
                        label-cols-sm="3" label-cols-lg="3">
                        <b-form-input id="email-form" name="email-form" v-model="$v.email.$model"
                          :state="!$v.email.$error" aria-describedby="email-live-feedback">
                        </b-form-input>
                        <b-form-invalid-feedback id="email-live-feedback" v-if="$v.email.email">
                          This is a required field.
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback id="email-live-feedback" v-if="$v.email.required">
                          must be a valid email.
                        </b-form-invalid-feedback>
                      </b-form-group>

                      <b-form-group id="example-input-group-1" label="Password: "
                        label-for="password-form" label-cols-sm="3" label-cols-lg="3">
                        <b-form-input id="password-form" name="password-form" type="password"
                          v-model="$v.password.$model"
                          :state="$v.password.$touch ? !$v.password.$error : null"
                          aria-describedby="password-live-feedback">
                        </b-form-input>
                        <b-form-invalid-feedback id="password-live-feedback"
                          v-if="$v.password.minLength">
                          This is a required field.
                        </b-form-invalid-feedback>
                        <b-form-invalid-feedback id="password-live-feedback"
                          v-if="$v.password.required">
                          Field must be {{ $v.password.$params.minLength.min }} characters.
                        </b-form-invalid-feedback>
                      </b-form-group>

                      <div class="form-group">
                        <button class="btn btn-primary btn-block" type="submit"
                          :disabled="$v.$invalid">Create Account</button>
                      </div> <!-- form-group// -->
                      <p class="text-center">Have an account? <a href="">Log In</a> </p>
                    </form>
                    <p v-if="boo">{{ boo }}</p>
                  </article>
                </b-card-text>
              </b-tab>

            </b-tabs>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import firebase from 'firebase';

  import {
    validationMixin
  } from 'vuelidate';
  import {
    required,
    minLength,
    email
  } from 'vuelidate/lib/validators';

  export default {
    name: 'Login',
    data() {
      return {
        // errors:[],
        name: null,
        email: null,
        password: null,
        phone: null,
        address: null,
        postcode: null,
        boo: null,
      }
    },
    validations: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      }
    },
    methods: {
      loginGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        firebase.auth().signInWithPopup(provider).then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const token = result.credential.accessToken;
          // The signed-in user info.
          const {
            user
          } = result;

          this.$router.push('/');
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const {
            email
          } = error;
          // The firebase.auth.AuthCredential type that was used.
          const {
            credential
          } = error;
          // ...
        });
      },
      login() {
        let email = this.email,
          password = this.password;

        this.$Progress.start();

        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => {
            
            this.$Progress.finish();
            Swal.fire({
              position: 'top-end',
              type: 'success',
              title: 'Logged in successfully',
              showConfirmButton: false,
              timer: 1500
            });

            this.$router.push('/');

          })
          .catch(error => {
            // Handle Errors here
            var errorCode = error.code;
            var errorMessage = error.message;
            this.$Progress.fail();
            // ...
            // [START_EXCLUDE]
            this.$Progress.fail();
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              this.boo = errorMessage;
            }
            // console.log(error);
            // response.status(500).send(error);
            // [END_EXCLUDE]
          });
      },
      register() {
        // Sign in with email and pass.
        // [START createwithemail]
        let email = this.email,
          password = this.password;

        this.$v.$touch()
        if (this.$v.$anyError) {
          return
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => {

            // Add a new document with a generated id.
            db.collection("profiles").doc(user.user.uid).set({
                name: this.name,
                phone: null,
                address: null,
                postcode: null,
                id: user.user.uid,
                email: this.email,

              })
              .then(() => {
                console.log("Document written with ID: ");
              })
              .catch(error => {
                console.error("Error adding document: ", error);
              });

            this.$router.replace('/');
          })
          .catch(error => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              this.boo = errorMessage;
            }
            // console.log(error);
            alert(error);
            // [END_EXCLUDE]
          });
        // [END createwithemail]
      }
    },
  };

</script>

<style>
  :root {
    --input-padding-x: 1.5rem;
    --input-padding-y: .75rem;
  }

  body {
    background: #007bff;
    background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
  }

  .card-signin {
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }

  .card-signin .card-title {
    margin-bottom: 2rem;
    font-weight: 300;
    font-size: 1.5rem;
  }

  .card-signin .card-body {
    padding: 2rem;
  }

  .form-signin {
    width: 100%;
  }

  .form-signin .btn {
    font-size: 80%;
    border-radius: 5rem;
    letter-spacing: .1rem;
    font-weight: bold;
    padding: 1rem;
    transition: all 0.2s;
  }

  .form-label-group {
    position: relative;
    margin-bottom: 1rem;
  }

  .form-label-group input {
    height: auto;
    border-radius: 2rem;
  }

  .form-label-group>input,
  .form-label-group>label {
    padding: var(--input-padding-y) var(--input-padding-x);
  }

  .form-label-group>label {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    margin-bottom: 0;
    /* Override default `<label>` margin */
    line-height: 1.5;
    color: #495057;
    border: 1px solid transparent;
    border-radius: .25rem;
    transition: all .1s ease-in-out;
  }

  .form-label-group input::-webkit-input-placeholder {
    color: transparent;
  }

  .form-label-group input:-ms-input-placeholder {
    color: transparent;
  }

  .form-label-group input::-ms-input-placeholder {
    color: transparent;
  }

  .form-label-group input::-moz-placeholder {
    color: transparent;
  }

  .form-label-group input::placeholder {
    color: transparent;
  }

  .form-label-group input:not(:placeholder-shown) {
    padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
    padding-bottom: calc(var(--input-padding-y) / 3);
  }

  .form-label-group input:not(:placeholder-shown)~label {
    padding-top: calc(var(--input-padding-y) / 3);
    padding-bottom: calc(var(--input-padding-y) / 3);
    font-size: 12px;
    color: #777;
  }

  .btn-google {
    color: white !important;
    background-color: #ea4335 !important;
  }

  .btn-facebook {
    color: white;
    background-color: #3b5998;
  }

  /* Fallback for Edge
-------------------------------------------------- */

  @supports (-ms-ime-align: auto) {
    .form-label-group>label {
      display: none;
    }

    .form-label-group input::-ms-input-placeholder {
      color: #777;
    }
  }

  /* Fallback for IE
-------------------------------------------------- */

  @media all and (-ms-high-contrast: none),
  (-ms-high-contrast: active) {
    .form-label-group>label {
      display: none;
    }

    .form-label-group input:-ms-input-placeholder {
      color: #777;
    }
  }

</style>
