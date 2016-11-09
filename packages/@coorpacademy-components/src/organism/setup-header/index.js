import {checker, createValidate} from '../../util/validation';
import createPicture from '../../atom/picture';
import createLink from '../../atom/link';
import style from './style.css';

const conditions = checker.shape({
  props: checker.shape({
    logout: checker.string.optional,
    logoutValue: checker.string.optional,
    href: checker.string.optional,
    user: checker.shape({
      username: checker.string.optional,
      image: checker.string.optional
    }).optional,
    logo: checker.string.optional,
    logoMobile: checker.string.optional
  })
});

export default (treant, options = {}) => {
  const {h} = treant;

  const Picture = createPicture(treant, options);
  const Link = createLink(treant, options);

  const SetupHeader = (props, children) => {
    const {
      logout,
      logoutValue,
      href,
      user = {},
      logo,
      logoMobile
    } = props;

    const {
      username = '',
      image = ''
    } = user;

    return (
      <div className={style.wrapper}>
        <div className={style.user}>
          <div className={style.avatar}>
            <img src={image} />
          </div>
          <div className={style.username}>
            {username}
          </div>
        </div>
        <div className={style.logo}>
          <Link href={href}>
            <Picture className={style.logoDesktop} src={logo} />
            <Picture className={style.logoMobile} src={logoMobile} />
          </Link>
        </div>
        <div className={style.logout}>
          <Link href={logout}>
            {logoutValue}
          </Link>
        </div>
      </div>
    );
  };

  SetupHeader.validate = createValidate(conditions);
  return SetupHeader;
};