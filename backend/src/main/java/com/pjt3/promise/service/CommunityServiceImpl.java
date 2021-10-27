package com.pjt3.promise.service;

import com.pjt3.promise.entity.Community;
import com.pjt3.promise.entity.CommunityComment;
import com.pjt3.promise.repository.CommuCommentRepository;
import com.pjt3.promise.repository.CommunityRepository;
import com.pjt3.promise.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommunityServiceImpl implements CommunityService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    CommunityRepository communityRepository;

    @Autowired
    CommuCommentRepository commuCommentRepository;

    @Override
    public int insertCommunityPost(String commuTitle, String commuContents) {
        try {
            Community community = new Community();
            community.setCommuTitle(commuTitle);
            community.setCommuContents(commuContents);
            communityRepository.save(community);
            return 1;
        } catch(Exception e) {
            return -1;
        }
    }

    @Override
    public int updateCommunityPost(int commuId, String commuTitle, String commuContents) {
        try {
            Community community = communityRepository.findCommunityByCommuId(commuId);
            community.setCommuTitle(commuTitle);
            community.setCommuContents(commuContents);
            communityRepository.save(community);
            return 1;
        } catch(Exception e) {
            return -1;
        }
    }

    @Override
    public int deleteCommunityPost(int commuId) {
        try {
            communityRepository.deleteByCommuId(commuId);
            return 1;
        } catch(Exception e) {
            return -1;
        }
    }

    @Override
    public int insertCommuComment(int commuId, String commentContents, String userEmail) {
        try {
            CommunityComment commuComment = new CommunityComment();
            commuComment.setCommentContents(commentContents);
            commuComment.setCommunity(communityRepository.findCommunityByCommuId(commuId));
            // 사용자 처리를 어떻게 할 것인가?
            commuComment.setUser(userRepository.findUserByUserEmail(userEmail));
            commuCommentRepository.save(commuComment);
            return 1;
        } catch(Exception e) {
            return -1;
        }
    }

    @Override
    public int updateCommuComment(int commentId, String commentContents) {
        try {
            CommunityComment commuComment = commuCommentRepository.findCommunityByCommentId(commentId);
            commuComment.setCommentContents(commentContents);
            commuCommentRepository.save(commuComment);
            return 1;
        } catch(Exception e) {
            return -1;
        }
    }

    @Override
    public int deleteCommuComment(int commentId) {
        try {
            commuCommentRepository.deleteByCommentId(commentId);
            return 1;
        } catch(Exception e) {
            return -1;
        }
    }
}
