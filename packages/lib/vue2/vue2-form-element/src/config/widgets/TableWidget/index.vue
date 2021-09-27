<template>
    <div>
        <el-button
            @click="addCol()"
        >
            增加一列
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
                @click="visible = !visible;if(domExcelTxt)domExcelTxt=excelTxt;"
            >
                从excel中复制
            </el-button>
        </el-popover>
        <el-table
            :data="values.slice(1)"
            stripe
            style="width: 100%"
        >
            <el-table-column
                v-for="(item, i) in values[0]"
                :key="i"
                :label="item"
            >
                <template slot-scope="scope">
                    {{ scope.row[i] }}
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
            >
                <template slot-scope="scope">
                    <el-button
                        circle
                        size="small"
                        type="danger"
                        icon="el-icon-delete"
                        @click="removeRow(scope.$index)"
                    >
                    </el-button>
                    <el-button
                        circle
                        size="small"
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
        values: {
            default: () => [['1列', '2列', '3列'], ['', '', '']],
            type: [Array]
        }
    },
    data() {
        const visible = false;
        const domExcelTxt = '';
        return {
            visible,
            domExcelTxt
        };
    },
    computed: {
        excelTxt: {
            get() {
                const strs = [];
                this.values.forEach(arr => {
                    strs.push(arr.join('\t'))
                })
                return strs.join('\n');
            },
            set(newValue) {
                debugger;
                const arrs = newValue.replace(/\n$/, '').split('\n');
                this.values.length=0
                arrs.forEach((line) => {
                    this.values.push(line.split('\t'));
                });
                console.log(arrs)
                console.log(this.values)
            }
        }
    },
    methods: {
        addCol(item) {
            debugger;
            this.values.map((arr) => {
                arr.push(item);
                return arr;
            });
            this.$emit('input', this.values);
        },
        removeCol() {
            this.values.map((arr) => {
                arr.pop();
                return arr;
            });
            this.$emit('input', this.values);
        },
        addRow(j) {
            debugger;
            const arr = [];
            for (let i = 0; i < this.values[0].length; i += 1) {
                arr.push('');
            }
            this.values.splice(j, 0, arr);
            this.$emit('input', this.values);
        },
        removeRow(j) {
            this.values.splice(j, 1);
            this.$emit('input', this.values);
        },
        excelOk() {
            this.excelTxt = this.domExcelTxt;
            this.$emit('input', this.values);
        }
    }

};
</script>
