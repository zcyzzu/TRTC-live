const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
        MyButton,
    },
    template: '<my-button @onClick="onClick" v-bind="$props" />',
});

const Primary = Template.bind({});
console.log(Primary());
Primary.args = {
    primary: true,
    label: "Button",
};