<template>
    <ValidationObserver ref="observer">
            <b-form slot-scope="{ validate }" @submit.prevent="validate().then(handleRegister)">
                <ValidationProvider rules="required" name="Username">
                    <b-form-group slot-scope="{ valid, errors }" label="Username">
                        <b-form-input
                                type="text"
                                v-model="user.username"
                                :state="errors[0] ? false : (valid ? true : null)"
                                placeholder="Enter user name">
                        </b-form-input>
                        <b-form-invalid-feedback>
                            {{ errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </ValidationProvider>

                <ValidationProvider rules="required|email" name="Email">
                    <b-form-group
                        slot-scope="{ valid, errors }"
                        label="Email">
                        <b-form-input
                            type="email"
                            v-model="user.email"
                            :state="errors[0] ? false : (valid ? true : null)"
                            placeholder="Please enter your email">
                        </b-form-input>
                        <b-form-invalid-feedback>
                            {{ errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </ValidationProvider>

                <ValidationProvider rules="required" name="Password" vid="password">
                    <b-form-group
                            slot-scope="{ valid, errors }"
                            label="Password">
                        <b-form-input
                                type="password"
                                v-model="user.password"
                                :state="errors[0] ? false : (valid ? true : null)"
                                placeholder="Enter password">
                        </b-form-input>
                        <b-form-invalid-feedback>
                            {{ errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </ValidationProvider>

                <ValidationProvider rules="required|confirmed:password" name="Confirm Password">
                    <b-form-group
                            slot-scope="{ valid, errors }"
                            label="Confirm Password">
                        <b-form-input
                                type="password"
                                v-model="user.confirmation"
                                :state="errors[0] ? false : (valid ? true : null)">
                        </b-form-input>
                        <b-form-invalid-feedback>
                            {{ errors[0] }}
                        </b-form-invalid-feedback>
                    </b-form-group>
                </ValidationProvider>
                <b-button block type="signUp" variant="primary">Sign Up</b-button>
                <router-link to="/login" class="btn btn-link">Cancel</router-link>

            </b-form>
        <div
                v-if="message"
                class="alert"
                :class="successful ? 'alert-success' : 'alert-danger'"
        >
            {{message}}
        </div>
    </ValidationObserver>
</template>

<script>
    import User from '@/models/user';
    import { ValidationObserver, ValidationProvider } from 'vee-validate'
    export default {
        components: {
            ValidationObserver,
            ValidationProvider
        },
        name: 'Register',
        data() {
            return {
                user: new User('', '', ''),
                submitted: false,
                successful: false,
                confirmation: '',
                message: ''
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        mounted() {
            if (this.loggedIn) {
                this.$router.push('/profile');
            }
        },
        methods: {
            handleRegister() {
                this.message = '';
                this.submitted = true;
                this.$store.dispatch('auth/register', this.user).then(
                    data => {
                        this.message = data.message;
                        this.successful = true;
                    },
                    error => {
                        this.message =
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString();
                        this.successful = false;
                    }
                )
            }
        }
    }
</script>

<style scoped>
    label {
        display: block;
        margin-top: 10px;
    }

    .card-container.card {
        max-width: 350px !important;
        padding: 40px 40px;
    }

    .card {
        background-color: #f7f7f7;
        padding: 20px 25px 30px;
        margin: 0 auto 25px;
        margin-top: 50px;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    }

    .profile-img-card {
        width: 96px;
        height: 96px;
        margin: 0 auto 10px;
        display: block;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 50%;
    }
</style>