export default {
    "schema": {
      "type": "object",
      "required": [],
      "properties": {
        "title": {
          "title": "活动标题",
          "type": "string",
          "ui:options": {
            "placeholder": "请输入"
          }
        },
        "platformName": {
          "title": "平台名称",
          "type": "string",
          "ui:options": {
            "placeholder": "请输入"
          }
        },
        "activeList": {
          "title": "活动列表",
          "type": "array",
          "items": {
            "type": "object",
            "required": [],
            "properties": {
              "active": {
                "title": "子活动",
                "type": "object",
                "required": [],
                "properties": {
                  "name": {
                    "title": "子活动名称",
                    "type": "string",
                    "ui:options": {
                      "placeholder": "请输入"
                    }
                  },
                  "title": {
                    "title": "子活动标题",
                    "type": "string",
                    "ui:options": {
                      "placeholder": "请输入"
                    }
                  },
                  "data": {
                    "title": "子活动内容",
                    "type": "table",
                    "ui:widget": "TableWidget"
                  },
                  "descripts": {
                    "title": "子活动描述",
                    "type": "array",
                    "items": {
                      "type": "object",
                      "required": [],
                      "properties": {
                        "descript": {
                          "title": "描述",
                          "type": "string",
                          "ui:options": {
                            "placeholder": "请输入"
                          }
                        }
                      },
                      "ui:order": [
                        "descript"
                      ]
                    },
                    "uniqueItems": false
                  }
                },
                "ui:order": [
                  "name",
                  "title",
                  "data",
                  "descripts"
                ]
              }
            },
            "ui:order": [
              "active"
            ]
          },
          "uniqueItems": false
        }
      },
      "ui:order": [
        "title",
        "platformName",
        "activeList"
      ]
    },
    "uiSchema": {},
    "formFooter": {
      "show": false
    },
    "formProps": {
      "labelWidth": "100px",
      "labelSuffix": "："
    }
  };
