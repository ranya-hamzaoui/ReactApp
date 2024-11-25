import React from 'react'
import { ModalPostWrapper } from '../components/features/posts/ModalContext'
import PostComponent from '../components/features/posts/PostComponent'

function Posts() {
  return (
    <ModalPostWrapper>
    <PostComponent/>
    </ModalPostWrapper>
  )
}

export default Posts