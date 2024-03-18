import { withAuth } from '@/utils/hooks';
import { User } from '@/utils/constants';

const adminLayout = () => {
  return <div>Admin Page Content</div>;
};


export default withAuth(adminLayout, [User.ADMIN]);
