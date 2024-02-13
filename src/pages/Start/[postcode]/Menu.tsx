import { useParams } from 'react-router-dom';

export default function PostcodeMenu() {
  const { postcode } = useParams();

  return <h2>{postcode}</h2>;
}
