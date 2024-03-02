import { withAuth } from '@/utils/hooks';
import { User } from '@/utils/constants';

const resourceLayout = () => {
  return <div>Resource Page Content</div>;
};


export default withAuth(resourceLayout, [User.EMPLOYEE, User.VOLUNTEER]);
