export default {
    schema: {
        type: 'object',
        required: [],
        properties: {
            logo: {
                title: 'Logo',
                type: 'string',
                'ui:widget': 'UploadWidget',
                'ui:options': {
                    action: 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca'
                }
            },
            banner: {
                title: 'Banner',
                type: 'object',
                required: [],
                properties: {
                    wrap: {
                        title: 'Banner背景框',
                        type: 'string',
                        'ui:widget': 'UploadWidget',
                        'ui:options': {
                            action: 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca'
                        }
                    },
                    bg: {
                        title: '背景图',
                        type: 'string',
                        'ui:widget': 'UploadWidget',
                        'ui:options': {
                            action: 'https://run.mocky.io/v3/518d7af7-204f-45ab-9628-a6e121dab8ca'
                        }
                    }
                },
                'ui:order': [
                    'wrap',
                    'bg'
                ]
            },
            activeList: {
                title: '活动列表',
                type: 'array',
                items: {
                    type: 'object',
                    required: [],
                    properties: {
                        active: {
                            title: '子活动',
                            type: 'object',
                            required: [],
                            properties: {
                                activeName: {
                                    title: '子活动名称',
                                    type: 'string',
                                    'ui:options': {
                                        placeholder: '请输入'
                                    }
                                },
                                theadBgColor: {
                                    title: '表头背景色',
                                    type: 'string',
                                    format: 'color'
                                },
                                theadColor: {
                                    title: '表头字体颜色',
                                    type: 'string',
                                    format: 'color'
                                }
                            },
                            'ui:order': [
                                'activeName',
                                'theadBgColor',
                                'theadColor'
                            ]
                        }
                    },
                    'ui:order': [
                        'active'
                    ]
                },
                uniqueItems: false
            }
        },
        'ui:order': [
            'logo',
            'banner',
            'activeList'
        ]
    },
    uiSchema: {},
    formFooter: {
        show: false
    },
    formProps: {
        labelWidth: '100px',
        labelSuffix: '：'
    }
};
