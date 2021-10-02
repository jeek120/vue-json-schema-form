<template>
    <div>
        <el-button
            size="mini"
            @click="addCol()"
        >
            增加一列
        </el-button>
        <el-button
            type="danger"
            size="mini"
            @click="removeCol()"
        >
            减少一列
        </el-button>
        <el-button
            v-if="!isEdit"
            size="mini"
            @click="edit()"
        >
            编辑
        </el-button>
        <el-button
            v-if="isEdit"
            type="primary"
            size="mini"
            @click="editOk()"
        >
            确定
        </el-button>
        <el-popover
            v-model="visible"
            placement="bottom"
            width="400"
            trigger="manual"
        >
            <p>复制excel需要黏贴的单元格，粘贴到这里</p>
            <el-input
                v-model="domExcelTxt"
                type="textarea"
                placeholder="复制excel需要黏贴的单元格，粘贴到这里"
            ></el-input>
            <div style="text-align: right; margin: 0">
                <el-button
                    size="mini"
                    type="text"
                    @click="visible = false"
                >
                    取消
                </el-button>
                <el-button
                    type="primary"
                    size="mini"
                    @click="visible = false;excelOk()"
                >
                    确定
                </el-button>
            </div>
            <el-button
                slot="reference"
                type="success"
                size="mini"
                @click="visible = !visible;if(domExcelTxt)domExcelTxt=excelTxt;"
            >
                从excel中复制
            </el-button>
        </el-popover>
        <el-table
            :data="value.slice(1)"
            stripe
            style="width: 100%"
        >
            <el-table-column
                v-for="(item, i) in value[0]"
                :key="i"
                :label="item"
            >
                <template
                    slot="header"
                    slot-scope="scope"
                >
                    <el-input
                        v-if="isEdit"
                        v-model="value[0][i]"
                    />
                    <span v-if="!isEdit">{{ value[0][i] }}</span>
                </template>
                <template slot-scope="scope">
                    <el-input
                        v-if="isEdit"
                        v-model="scope.row[i]"
                    />
                    <span v-if="!isEdit">{{ scope.row[1] }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
            >
                <template slot-scope="scope">
                    <el-button
                        circle
                        size="mini"
                        type="danger"
                        icon="el-icon-delete"
                        @click="removeRow(scope.$index)"
                    >
                    </el-button>
                    <el-button
                        circle
                        size="mini"
                        type="primary"
                        icon="el-icon-plus"
                        @click="addRow(scope.$index)"
                    >
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'TableWidget',
    props: {
        value: {
            default: () => [['1列', '2列', '3列'], ['', '', '']],
            type: [Array]
        }
    },
    data() {
        const visible = false;
        const domExcelTxt = '';
        const isEdit = false;
        return {
            visible,
            domExcelTxt,
            isEdit
        };
    },
    computed: {
        excelTxt: {
            get() {
                const strs = [];
                this.value.forEach((arr) => {
                    strs.push(arr.join('\t'));
                });
                return strs.join('\n');
            },
            set(newValue) {
                const arrs = newValue.replace(/\n$/, '').split('\n');
                this.value.length = 0;
                arrs.forEach((line) => {
                    this.value.push(line.split('\t'));
                });
            }
        }
    },
    methods: {
        edit() {
            this.isEdit = true;
            this.value.splice(0, 0);
            this.$emit('input', this.value);
        },
        editOk() {
            this.isEdit = false;
            this.value.splice(0, 0);
            this.$emit('input', this.value);
        },
        addCol(item) {
            this.value.map((arr, idx) => {
                if (idx === 0) {
                    arr.push('列');
                } else {
                    arr.push(item);
                }
                return arr;
            });
            this.$emit('input', this.value);
        },
        removeCol() {
            this.value.map((arr) => {
                arr.pop();
                return arr;
            });
            this.$emit('input', this.value);
        },
        addRow(j) {
            const arr = [];
            for (let i = 0; i < this.value[0].length; i += 1) {
                arr.push('');
            }
            this.value.splice(j + 2, 0, arr);
            this.$emit('input', this.value);
        },
        removeRow(j) {
            this.value.splice(j + 1, 1);
            this.value.splice(0, 0);
            this.$emit('input', this.value);
        },
        excelOk() {
            this.excelTxt = this.domExcelTxt;
            this.isEdit = false;
            this.value.splice(0, 0);
            this.$emit('input', this.value);
        }
    }

};
</script>
