import { Layout, Typography, Image } from 'antd';

const { Header } = Layout
const { Link } = Typography

export default function HeaderComponent(){
	return (
		<>
			<Header style={{ paddingTop: 10 }}>
        <Link href="./">
          <Image src="/logo_branco.png" alt="SAPS3 Logo" width={100} height={50} preview={false} />
        </Link>
			</Header>
		</>
	)
}