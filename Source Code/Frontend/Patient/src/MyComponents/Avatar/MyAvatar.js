import { Avatar } from '@mui/material';

function MyAvatar({ name, image, sx = {} }) {

  function stringToColor(str) {
    let hash = 0;
    let i;
    for (i = 0; i < str.length; i += 1) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    let child;
    let fullName = name.split(' ');
    if (fullName.length > 1)
      child = `${fullName[0][0]}${fullName[1][0]}`;
    else
      child = `${fullName[0][0]}`;
    return {
      sx: {
        bgcolor: stringToColor(name),
        ...sx,
      },
      children: child,
    };
  }

  if (image) {
    return (
      <>
        <Avatar src={image} sx={sx} />
      </>
    );
  } else {

    return (
      <>
        <Avatar
          {...stringAvatar(name)}
        />
      </>
    );
  }
};

export default MyAvatar;