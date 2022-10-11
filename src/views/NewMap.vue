<template>
    <div class="main-header">
        <h1 class="main-title">new map</h1>
    </div>
    <div class="main-inner">
        <div class="mb-3">
            <h2>Title: </h2>
            <input v-model="map.title" type="text"/>
        </div>

        <div class="row">
            <div class="col-md-6 map__preview">
                <div v-for="(row, rowKey, rowIndex) in fields" :key="rowIndex" class="map__preview__row">
                    <div v-for="(column, colKey, colIndex) in row" :key="colIndex" class="map__preview__field"
                         :class="{
                             'wall-field': column === 2,
                             'box-field': column === 1001,
                             'player-field': column === 501,
                             'crown-field': column === 502
                         }"
                         style="cursor: pointer" @click="applyField(rowKey, colKey)">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="d-flex gap-3 mb-3">
                    <a href="#" class="btn" @click.prevent="addRow">Add row</a>
                    <a href="#" class="btn" @click.prevent="addColumn">Add column</a>
                </div>
                <div class="d-flex gap-3 mb-5">
                    <a href="#" class="btn btn--danger" @click.prevent="removeRow">Remove row</a>
                    <a href="#" class="btn btn--danger" @click.prevent="removeColumn">Remove column</a>
                </div>
                <div class="d-flex gap-3 mb-3 flex-wrap">
                    <a href="#" class="btn" v-for="(tool, toolName, i) in tools" :key="i"
                       :class="{'selected': selectedTool === toolName}"
                       @click.prevent="selectTool(toolName)">{{ toolName }}</a>
                </div>
            </div>
        </div>

        <div class="mt-5">
            <a href="#" @click.prevent="createMap()" class="btn">Create</a>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import AuthService from "@/services/auth.service";

export default {
    name: "games",
    data() {
        return {
            map: {
                title: '',
                rows: 5,
                cols: 5
            },
            tools: {
                'empty': 1,
                'wall': 2,
                'player': 501,
                'objective': 502,
                'box': 1001,
            },
            selectedTool: 'empty',
            fields: {
                '1': {
                    '1': 1,
                    '2': 1,
                    '3': 1,
                    '4': 1,
                    '5': 1,
                },
                '2': {
                    '1': 1,
                    '2': 1,
                    '3': 1,
                    '4': 1,
                    '5': 1,
                },
                '3': {
                    '1': 1,
                    '2': 1,
                    '3': 1,
                    '4': 1,
                    '5': 1,
                },
                '4': {
                    '1': 1,
                    '2': 1,
                    '3': 1,
                    '4': 1,
                    '5': 1,
                },
                '5': {
                    '1': 1,
                    '2': 1,
                    '3': 1,
                    '4': 1,
                    '5': 1,
                },
            }
        }
    },
    methods: {
        addRow() {
            console.log('add row');
            this.map.rows++;
            const newRow = {};
            for (let i = 1; i <= this.map.cols; i++) {
                newRow[i.toString()] = 1;
            }
            this.fields[this.map.rows.toString()] = newRow;
        },
        removeRow() {
            delete this.fields[this.map.rows.toString()];
            this.map.rows--;
        },
        addColumn() {
            console.log('add col');
            this.map.cols++;

            let newFields = JSON.parse(JSON.stringify(this.fields));
            Object.entries(newFields).forEach(([key, value]) => {
                newFields[key][this.map.cols.toString()] = 1;
            });

            this.fields = newFields;

        },
        removeColumn() {
            let newFields = JSON.parse(JSON.stringify(this.fields));
            Object.entries(newFields).forEach(([key, value]) => {
                delete newFields[key][this.map.cols.toString()];
            });
            this.fields = newFields;
            this.map.cols--;
        },
        applyField(row, col) {
            // Objective check
            if (this.selectedTool === 'objective') {
                console.log('a');
                Object.entries(this.fields).forEach(([key, value]) => {
                    Object.entries(value).forEach(([key2, value2]) => {
                        if (value2 === 502) {
                            this.fields[key][key2] = 1;
                        }
                    });
                });
            }

            this.fields[row][col] = this.tools[this.selectedTool]
        },
        selectTool(tool) {
            this.selectedTool = tool;
        },
        createMap() {
            const data = {
                'title': this.map.title,
                'rows': this.map.rows,
                'cols': this.map.cols,
                'fields': this.fields
            };
            console.log(data);
            axios
                .post(AuthService.getApiUrl() + 'maps/create', data, AuthService.getAuthHeader())
                .then(response => {
                    console.log(response.data);
                    this.$router.push({name: 'games'})
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },
    mounted() {

    }

}
</script>