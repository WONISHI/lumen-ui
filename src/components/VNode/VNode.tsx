import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "VNode",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup(props: { msg: string }) {
    const count = ref(1);
    return () => (
      <div>
        <h1>{props.msg}</h1>
        <p>{count.value}</p>
      </div>
    );
  },
});
