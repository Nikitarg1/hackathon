<template>
  <div>
    <v-navigation-drawer
        app
        right
        fixed
        style="z-index: 7;"
        v-model="drawer"
        disable-resize-watcher
        width="225"
        :color="this.$vuetify.theme.dark ? backgroundDark : background"
    >
      <template v-slot:prepend>
        <v-list-item>


          <v-spacer></v-spacer>

          <v-btn icon color="black" @click="setLogin">
            <v-icon> mdi-login-variant </v-icon>
          </v-btn>


        </v-list-item>
        <transition name="slideLeftItem" enter-active-class="animated slideInRight navItemOne"
                    leave-active-class="animated slideOutLeft">
          <v-list-item class="mb-2" v-show="drawer">
            <h1 class="text-3xl font-weight-bold logoBlack--text">Меню</h1>
          </v-list-item>
        </transition>
      </template>
      <v-list
          nav
          dense>
        <v-list-item-group>
          <router-link :to="'/' + item.link" v-for="item in liItems" :key="item.name" style="color: inherit;">
            <transition name="slideLeftItem" :enter-active-class="item.class"
                        leave-active-class="animated slideOutLeft">
              <v-list-item v-show="drawer">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item>
            </transition>
          </router-link>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <transition name="slideLeftItem" enter-active-class="animated slideInRight navItemSix"
                    leave-active-class="animated slideOutLeft">
          <div class="pb-4 text-center" v-show="drawer">
            <v-btn icon large>
              <v-icon>mdi-telegram</v-icon>
            </v-btn>
            <v-btn icon large>
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon large>
              <v-icon>mdi-vk</v-icon>
            </v-btn>
          </div>
        </transition>
      </template>
    </v-navigation-drawer>

    <transition name="slideLeft">
      <div v-if="drawer" class="navBlur"></div>
    </transition>

    <v-app-bar
        app
        fixed
        elevate-on-scroll
        :color="this.$vuetify.theme.dark ? backgroundDark : background">

      <v-toolbar-title class="logo logoBlack--text">Rubble</v-toolbar-title>

      <v-spacer></v-spacer>

      <ul class="navigation d-none d-sm-flex">
        <li v-for="item in liItems"
            :key="item.name">
          <a :href="'/' + item.link" class="logoBlack--text" :style="item.style">{{ item.name }}</a>
        </li>
      </ul>

      <v-btn icon @click="setTheme">
        <v-icon>{{ this.$vuetify.theme.dark ? 'mdi-brightness-5' : 'mdi-brightness-4' }}</v-icon>
      </v-btn>

      <v-btn text @click="setLogin" class="d-none d-sm-flex">
        {{ isLogin ? this.user.email : 'Войти'}}
      </v-btn>

      <v-app-bar-nav-icon class="d-block d-sm-none" @click.stop="drawer = true"></v-app-bar-nav-icon>

      <v-progress-linear
          :active="isLoading"
          buffer-value="100"
          v-model="valueProgress"
          absolute
          bottom
          rounded
          color="blue"
      ></v-progress-linear>

    </v-app-bar>

    <v-app-bar fixed :class="{  'isScroll' : letsScroll}" :color="letsScroll ? 'transparent' : (this.$vuetify.theme.dark ? 'rgb(64,180,173)' : 'rgb(80, 225, 216)')" style="z-index: 4;" flat></v-app-bar>

    <div class="d-block d-sm-none" style="width: 25px; height: 100%; position: fixed; z-index: 3; right: 0;"
         v-touch="{left: () => drawer = true}"
    ></div>
    <!--    Свайп для бокового меню-->

  </div>
</template>

<script>
import store from "@/store";

export default {
  props: ['color', 'isLoading', 'valueProgress'],
  name: "Header",
  data: () => ({
    isLogin: false,
    drawer: false,
    email: 'asd',
    uid: '',
    letsScroll: false,
    liItems: [
      {link: '', name: 'Главная', icon: 'mdi-home', class: 'navItemTwo animated slideInRight'},
      {link: 'one', name: 'Мой дом', icon: 'mdi-book-multiple', class: 'navItemTree animated slideInRight'},
      {link: 'buyers', name: 'Покупатели', icon: 'mdi-account-multiple', class: 'navItemFive animated slideInRight', style: 'margin-right: 16px;'}
    ]
  }),
  computed: {
    background: function () {
      return 'rgba(80, 225, 216, .7)'
    },
    backgroundDark: function () {
      return 'rgba(64,180,173, .7)'
    },
  },
  mounted() {
    this.email = store.email
    // if (this.user != null) {
    //   this.email = this.user.email;
    //   this.uid = this.user.uid;
    // }


    window.addEventListener("scroll", this.onScroll);
    const theme = localStorage.getItem("isDark");
    if (theme) {
      this.$vuetify.theme.dark = theme === "true";
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    setLogin(){
      this.$router.push('login')
    },
    setTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("isDark", this.$vuetify.theme.dark.toString());
    },
    onScroll(e) {
      this.number = e.target.documentElement.scrollTop;
      this.handleScroll(this.number);
    },
    handleScroll(number1) {
      this.letsScroll = number1 >= 1
    }
  }
}
</script>

<style scoped>

.fullBgc {
  background-color: rgb(80, 225, 216);
}

.isScroll {
  backdrop-filter: blur(10px);
}

.navBlur {
  position: fixed;
  top: 0;
  right: 0;
  width: 225px;
  height: 100%;
  backdrop-filter: blur(10px);
  z-index: 6;
}

.logo {
  letter-spacing: 1px;
  font-size: 2em;
  text-decoration: none;
  font-weight: 600;
}

.navigation li a {
  margin-right: 40px;
  text-decoration: none;
}

.navigation {
  list-style: none;
}

.navItemOne {
  --animate-duration: 300ms;
}

.navItemTwo {
  --animate-duration: 350ms;
}

.navItemTree {
  --animate-duration: 400ms;
}

.navItemFour {
  --animate-duration: 450ms;
}

.navItemFive {
  --animate-duration: 500ms;
}

.navItemSix {
  --animate-duration: 550ms;
}

.slideLeft-enter-active, .slideLeft-leave-active {
  transition: transform cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.2s;
}

.slideLeft-enter, .slideLeft-leave-to {
  transform: translateX(100%);
}
</style>