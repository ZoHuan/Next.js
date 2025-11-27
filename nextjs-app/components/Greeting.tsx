type GreetingProps = {
  name: string;
};

export default function Greeting({ name }: GreetingProps) {
  return <p>你好, {name}！</p>;
}
