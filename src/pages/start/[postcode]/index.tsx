import { useParams } from 'react-router-dom';

export default function Postcode() {
  const { postcode } = useParams();

  return <h2>{postcode}</h2>;
}
