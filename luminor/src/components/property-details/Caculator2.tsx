import Caculator from "./Caculator";
export default function Caculator2(props: { price?: number; period?: string }) {
    return <Caculator {...props} compact />;
}
