import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYLE = {
  color: 'primary.main',
  // bgcolor: 'white',
  border: 'none',
  px: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    backgroundColor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trelloCustom.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: 2,
        overflowX: 'auto',
        borderTop: '1px solid #00bfa5'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label='duongtranngoc'
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label='Public/Private Workspaces'
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label='Add to Drive'
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<MotionPhotosAutoIcon />}
          label='Automation'
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label='Filters'
          clickable
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant='outlined' startIcon={<PersonAddIcon />}>
          Invite
        </Button>

        <AvatarGroup
          sx={{
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              fontSize: 16,
            },
          }}
          max={4}
        >
          <Tooltip title='duongtranngoc'>
            <Avatar
              alt='duongtranngoc'
              src='https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/414071919_122115312374134316_5999063127509369348_n.jpg?stp=dst-jpg_p200x200&_nc_cat=107&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFsVlNK-komRN0P838YIZ3xa2WY7NZp0qlrZZjs1mnSqWHA87_LHZAW0lE07YNCFGXU5Q7wq3ne9wh4kBEdbKK5&_nc_ohc=DBNthQMNxNUAX-oRS0X&_nc_oc=AQm_x97tAhIe9wrrhut0UCfAqc9y_FOtCzQZB-0Opx7ksbPMh8ODzmHXCO37ikNGE38&_nc_ht=scontent.fhan17-1.fna&oh=00_AfBeP8vsPFk1ECtYooufe13l_aJO58XuI_xittJARXS3-A&oe=659AE16B'
            />
          </Tooltip>

          <Tooltip title='duongtranngoc'>
            <Avatar
              alt='duongtranngoc'
              src='https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/414071919_122115312374134316_5999063127509369348_n.jpg?stp=dst-jpg_p200x200&_nc_cat=107&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFsVlNK-komRN0P838YIZ3xa2WY7NZp0qlrZZjs1mnSqWHA87_LHZAW0lE07YNCFGXU5Q7wq3ne9wh4kBEdbKK5&_nc_ohc=DBNthQMNxNUAX-oRS0X&_nc_oc=AQm_x97tAhIe9wrrhut0UCfAqc9y_FOtCzQZB-0Opx7ksbPMh8ODzmHXCO37ikNGE38&_nc_ht=scontent.fhan17-1.fna&oh=00_AfBeP8vsPFk1ECtYooufe13l_aJO58XuI_xittJARXS3-A&oe=659AE16B'
            />
          </Tooltip>

          <Tooltip title='duongtranngoc'>
            <Avatar
              alt='duongtranngoc'
              src='https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/414071919_122115312374134316_5999063127509369348_n.jpg?stp=dst-jpg_p200x200&_nc_cat=107&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFsVlNK-komRN0P838YIZ3xa2WY7NZp0qlrZZjs1mnSqWHA87_LHZAW0lE07YNCFGXU5Q7wq3ne9wh4kBEdbKK5&_nc_ohc=DBNthQMNxNUAX-oRS0X&_nc_oc=AQm_x97tAhIe9wrrhut0UCfAqc9y_FOtCzQZB-0Opx7ksbPMh8ODzmHXCO37ikNGE38&_nc_ht=scontent.fhan17-1.fna&oh=00_AfBeP8vsPFk1ECtYooufe13l_aJO58XuI_xittJARXS3-A&oe=659AE16B'
            />
          </Tooltip>

          <Tooltip title='duongtranngoc'>
            <Avatar
              alt='duongtranngoc'
              src='https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/414071919_122115312374134316_5999063127509369348_n.jpg?stp=dst-jpg_p200x200&_nc_cat=107&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFsVlNK-komRN0P838YIZ3xa2WY7NZp0qlrZZjs1mnSqWHA87_LHZAW0lE07YNCFGXU5Q7wq3ne9wh4kBEdbKK5&_nc_ohc=DBNthQMNxNUAX-oRS0X&_nc_oc=AQm_x97tAhIe9wrrhut0UCfAqc9y_FOtCzQZB-0Opx7ksbPMh8ODzmHXCO37ikNGE38&_nc_ht=scontent.fhan17-1.fna&oh=00_AfBeP8vsPFk1ECtYooufe13l_aJO58XuI_xittJARXS3-A&oe=659AE16B'
            />
          </Tooltip>

          <Tooltip title='duongtranngoc'>
            <Avatar
              alt='duongtranngoc'
              src='https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/414071919_122115312374134316_5999063127509369348_n.jpg?stp=dst-jpg_p200x200&_nc_cat=107&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFsVlNK-komRN0P838YIZ3xa2WY7NZp0qlrZZjs1mnSqWHA87_LHZAW0lE07YNCFGXU5Q7wq3ne9wh4kBEdbKK5&_nc_ohc=DBNthQMNxNUAX-oRS0X&_nc_oc=AQm_x97tAhIe9wrrhut0UCfAqc9y_FOtCzQZB-0Opx7ksbPMh8ODzmHXCO37ikNGE38&_nc_ht=scontent.fhan17-1.fna&oh=00_AfBeP8vsPFk1ECtYooufe13l_aJO58XuI_xittJARXS3-A&oe=659AE16B'
            />
          </Tooltip>

          <Tooltip title='duongtranngoc'>
            <Avatar
              alt='duongtranngoc'
              src='https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/414071919_122115312374134316_5999063127509369348_n.jpg?stp=dst-jpg_p200x200&_nc_cat=107&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFsVlNK-komRN0P838YIZ3xa2WY7NZp0qlrZZjs1mnSqWHA87_LHZAW0lE07YNCFGXU5Q7wq3ne9wh4kBEdbKK5&_nc_ohc=DBNthQMNxNUAX-oRS0X&_nc_oc=AQm_x97tAhIe9wrrhut0UCfAqc9y_FOtCzQZB-0Opx7ksbPMh8ODzmHXCO37ikNGE38&_nc_ht=scontent.fhan17-1.fna&oh=00_AfBeP8vsPFk1ECtYooufe13l_aJO58XuI_xittJARXS3-A&oe=659AE16B'
            />
          </Tooltip>

          <Tooltip title='duongtranngoc'>
            <Avatar
              alt='duongtranngoc'
              src='https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/414071919_122115312374134316_5999063127509369348_n.jpg?stp=dst-jpg_p200x200&_nc_cat=107&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeFsVlNK-komRN0P838YIZ3xa2WY7NZp0qlrZZjs1mnSqWHA87_LHZAW0lE07YNCFGXU5Q7wq3ne9wh4kBEdbKK5&_nc_ohc=DBNthQMNxNUAX-oRS0X&_nc_oc=AQm_x97tAhIe9wrrhut0UCfAqc9y_FOtCzQZB-0Opx7ksbPMh8ODzmHXCO37ikNGE38&_nc_ht=scontent.fhan17-1.fna&oh=00_AfBeP8vsPFk1ECtYooufe13l_aJO58XuI_xittJARXS3-A&oe=659AE16B'
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
