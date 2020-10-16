<template>
  <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
  >
    <template v-slot:header>

      <v-row
          justify="center"
          align="center"
      >
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="search"
              clearable
              outlined
              hide-details
              label="Поиск"
              color="saturatedGreen"
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="4"
        >
          <v-select
              v-model="sortBy"
              outlined
              hide-details
              :items="keysRus"
              label="Фильтер"
              color="rgb(204,204,255)"
          ></v-select>
        </v-col>
        <v-col
            cols="12"
            md="4"
        >
          <v-btn-toggle
              v-model="sortDesc"
              borderless
          >
            <v-btn
                large
                depressed
                block
                :value="false"
                color="rgb(204,204,255)"
            >
              <v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn
                large
                block
                depressed
                :value="true"
                color="rgb(204,204,255)"
            >
              <v-icon>mdi-arrow-down</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </template>

    <template v-slot:default="props">
      <v-row>
        <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="3"
            lg="3"
        >
          <v-card>
            <v-img
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.4)"
                height="400"
                :src="item.img">
              <v-card-title class="subheading font-weight-bold">
                {{ item.name }}
              </v-card-title>
            </v-img>

            <v-card-text class="body-1">
              <div v-for="(key, index) in filteredKeys"
                   :key="index">
                <span :class="{ 'blue--text': sortBy === key }">
                  {{ item[key.toLowerCase()] }}
                </span>

              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer>
      <v-row
          class="mt-2"
          align="center"
          justify="center"
      >
        <span class="grey--text">Количество домов</span>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                dark
                text
                color="rgb(204,204,255)"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
            >
              {{ itemsPerPage }}
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
            >
              <v-list-item-title>{{ number }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-spacer></v-spacer>

        <span
            class="mr-4
            grey--text"
        >
            Страница {{ page }} из {{ numberOfPages }}
          </span>
        <v-btn
            fab
            color="rgb(204,204,255)"
            class="mr-1"
            @click="formerPage"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
            fab
            color="rgb(204,204,255)"
            class="ml-1"
            @click="nextPage"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
export default {
  name: "PeopleSearch",
  data: () => ({
    itemsPerPageArray: [8, 12],
    search: '',
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 8,
    sortBy: 'name',
    keysRus: [
      {text: 'Имя', value: 'name'},
      {text: 'Оценка', value: 'mark'},
      {text: 'Грамоты', value: 'charters'},
      {text: 'Класс', value: 'class'},
      {text: 'Последний экзамен', value: 'lastexam'},
    ],
    keys: [
      'name',
      'mark',
      'charters',
      'class',
      'lastexam'
    ],
    items: [
      {name: 'Фролов Андрей', img: 'https://telemed.nrcii.ru/static/img/user.png', mark: 'Оценка: 4',class: 'Класс: 5', charters: 'Количество грамот: 10', lastexam: 'Последний экзамен: сдан'},
      {name: 'Путятин Елисей', img: 'https://telemed.nrcii.ru/static/img/user.png', mark: 'Оценка: 5',class: 'Класс: 6', charters: 'Количество грамот: 8', lastexam: 'Последний экзамен: сдан'},
      {name: 'Генкин Руслан', img: 'https://telemed.nrcii.ru/static/img/user.png', mark: 'Оценка: 3',class: 'Класс: 7', charters: 'Количество грамот: 0', lastexam: 'Последний экзамен: сдан'},
      {name: 'Мартюшев Марсель', img: 'https://telemed.nrcii.ru/static/img/user.png', mark: 'Оценка: 2',class: 'Класс: 6', charters: 'Количество грамот: 0', lastexam: 'Последний экзамен: не сдан'},
      {name: 'Евстигнеев Вадим', img: 'https://telemed.nrcii.ru/static/img/user.png', mark: 'Оценка: 3',class: 'Класс: 8', charters: 'Количество грамот: 6', lastexam: 'Последний экзамен: сдан'},
      {name: 'Демидов Петр', img: 'https://telemed.nrcii.ru/static/img/user.png', mark: 'Оценка: 3',class: 'Класс: 6', charters: 'Количество грамот: 7', lastexam: 'Последний экзамен: сдан'},
      {name: 'Гавриков Александр', img: 'https://telemed.nrcii.ru/static/img/user.png', mark: 'Оценка: 5',class: 'Класс: 9', charters: 'Количество грамот: 12', lastexam: 'Последний экзамен: сдан'},
      {name: 'Черников Павел', img: 'https://telemed.nrcii.ru/static/img/user.png', mark: 'Оценка: 4',class: 'Класс: 10', charters: 'Количество грамот: 15', lastexam: 'Последний экзамен: сдан'},
      {name: 'Большаков Виктор', img: 'https://telemed.nrcii.ru/static/img/user.png', mark: 'Оценка: 4',class: 'Класс: 10', charters: 'Количество грамот: 2', lastexam: 'Последний экзамен: не сдан'},
      {name: 'Дырбов Артем', img: 'https://telemed.nrcii.ru/static/img/user.png', mark: 'Оценка: 3',class: 'Класс: 11', charters: 'Количество грамот: 2', lastexam: 'Последний экзамен: не сдан'},
      {name: 'Шелагин Алексей', img: 'https://telemed.nrcii.ru/static/img/user.png', mark: 'Оценка: 4',class: 'Класс: 11', charters: 'Количество грамот: 10',lastexam: 'Последний экзамен: сдан'},
      {name: 'Бершов Родион', img: 'https://telemed.nrcii.ru/static/img/user.png', mark: 'Оценка: 4',class: 'Класс: 5', charters: 'Количество грамот: 3', lastexam: 'Последний экзамен: не сдан'},
    ],
  }),
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter(keyss => keyss !== 'name')
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
  },
}
</script>

<style scoped>
.v-btn-toggle {
  width: 50%;
}
</style>