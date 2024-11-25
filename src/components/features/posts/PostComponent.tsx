import React, { useContext, useState } from 'react'
import ModalComponent from '../../ui/ModalComponent'
import TablePost from './TablePost'
import Button from 'react-bootstrap/Button';
import AddPost from './AddPost';
import { ModalPostContext } from './ModalContext';
import UpdatePost from './UpdatePost';

function PostComponent() {
  const { openUpdate, setOpenUpdate } = useContext(ModalPostContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const handleOpenUpdate = () => setOpenUpdate(!openUpdate);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end mb-3">
      <Button variant="dark" onClick={handleOpen}>
        Add Post
      </Button>
      </div>
      <ModalComponent
        submitId = "addPost-form"
        show={open}
        onClose={handleOpen}
        title="Add Post"
        buttons = {{submit: "add Post"}}
      >
       <AddPost handleOpen={handleOpen} />
      </ModalComponent>
    <TablePost/>
    <ModalComponent
        submitId = "updatePost-form"
        show={openUpdate}
        onClose={handleOpenUpdate}
        title="Update Post"
        footer= {true}
        buttons = {{submit: "update Post"}}
      >
       <UpdatePost handleOpenUpdate={handleOpenUpdate}/>
      </ModalComponent>
    </div>
    
  )
}

export default PostComponent