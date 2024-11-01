import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Pressable,
  Switch,
  Image,
} from 'react-native';
import FeatherIcon from '@expo/vector-icons//Feather';
import { useAuthStore } from '@/store/authStore';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedScrollView } from '@/components/ThemedScrollView';
import { FONTFAMILY } from '@/constants/theme';


export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  return (
    <SafeAreaView style={{ flex: 1}}>
      <ThemedView style={styles.container}>
        <ThemedScrollView>
          <ThemedView style={styles.profile}>
            <Image
              alt=""
              source={require('../../assets/images/prof.jpg')}
              style={styles.profileAvatar} />

            <ThemedText style={styles.profileName}>John Doe</ThemedText>

            <ThemedText style={styles.profileEmail}>{user ? user.email:'Loading'}</ThemedText>

            <Pressable
              onPress={() => {
                // handle onPress
              }}>
              <ThemedView style={styles.profileAction}>
                <ThemedText style={styles.profileActionText}>Edit Profile</ThemedText>

                <FeatherIcon color="#fff" name="edit" size={16} />
              </ThemedView>
            </Pressable>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Preferences</ThemedText>

            <ThemedView style={styles.sectionBody}>
              <ThemedView style={[styles.rowWrapper, styles.rowFirst]}>
                <Pressable
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <ThemedView
                    style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="globe"
                      size={20} />
                  </ThemedView>

                  <ThemedText style={styles.rowLabel}>Language</ThemedText>

                  <ThemedView style={styles.rowSpacer} />

                  <ThemedText style={styles.rowValue}>English</ThemedText>

                  <FeatherIcon
                    color="#C6C6C6"
                    name="chevron-right"
                    size={20} />
                </Pressable>
              </ThemedView>

              <ThemedView style={styles.rowWrapper}>
                <ThemedView style={styles.row}>
                  <ThemedView
                    style={[styles.rowIcon, { backgroundColor: '#007AFF' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="moon"
                      size={20} />
                  </ThemedView>

                  <ThemedText style={styles.rowLabel}>Dark Mode</ThemedText>

                  <ThemedView style={styles.rowSpacer} />

                  <Switch
                    onValueChange={darkMode => setForm({ ...form, darkMode })}
                    value={form.darkMode} />
                </ThemedView>
              </ThemedView>

              <ThemedView style={styles.rowWrapper}>
                <Pressable
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <ThemedView
                    style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                    <FeatherIcon
                      color="#fff"
                      name="navigation"
                      size={20} />
                  </ThemedView>

                  <ThemedText style={styles.rowLabel}>Location</ThemedText>

                  <ThemedView style={styles.rowSpacer} />

                  <ThemedText style={styles.rowValue}>Los Angeles, CA</ThemedText>

                  <FeatherIcon
                    color="#C6C6C6"
                    name="chevron-right"
                    size={20} />
                </Pressable>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.section}>
              <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>

              <ThemedView style={styles.sectionBody}>
                <ThemedView style={[styles.rowWrapper, styles.rowFirst]}>
                  <ThemedView style={styles.row}>
                    <ThemedView
                      style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                      <FeatherIcon
                        color="#fff"
                        name="at-sign"
                        size={20} />
                    </ThemedView>

                    <ThemedText style={styles.rowLabel}>Email Notifications</ThemedText>

                    <ThemedView style={styles.rowSpacer} />

                    <Switch
                      onValueChange={emailNotifications =>
                        setForm({ ...form, emailNotifications })
                      }
                      value={form.emailNotifications} />
                  </ThemedView>
                </ThemedView>

                <ThemedView style={styles.rowWrapper}>
                  <ThemedView style={styles.row}>
                    <ThemedView
                      style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                      <FeatherIcon
                        color="#fff"
                        name="bell"
                        size={20} />
                    </ThemedView>

                    <ThemedText style={styles.rowLabel}>Push Notifications</ThemedText>

                    <ThemedView style={styles.rowSpacer} />

                    <Switch
                      onValueChange={pushNotifications =>
                        setForm({ ...form, pushNotifications })
                      }
                      value={form.pushNotifications} />
                  </ThemedView>
                </ThemedView>

                <ThemedView style={styles.rowWrapper}>
                  <Pressable
                    onPress={() => {
                      // handle onPress
                    }}
                    style={styles.row}>
                    <ThemedView
                      style={[styles.rowIcon, { backgroundColor: '#FE3C30' }]}>
                      <FeatherIcon
                        color="#fff"
                        name="music"
                        size={20} />
                    </ThemedView>

                    <ThemedText style={styles.rowLabel}>Sound</ThemedText>

                    <ThemedView style={styles.rowSpacer} />

                    <ThemedText style={styles.rowValue}>Default</ThemedText>

                    <FeatherIcon
                      color="#C6C6C6"
                      name="chevron-right"
                      size={20} />
                  </Pressable>
                </ThemedView>

                <ThemedView style={styles.rowWrapper}>
                  <Pressable
                    onPress={() => {
                      logout();
                    }}
                    style={styles.row}>
                    <ThemedView
                      style={[styles.rowIcon, { backgroundColor: '#FE3C30' }]}>
                      <FeatherIcon
                        color="#fff"
                        name="log-out"
                        size={20} />
                    </ThemedView>

                    <ThemedText style={styles.rowLabel}>Logout</ThemedText>

                    <ThemedView style={styles.rowSpacer} />

                    <ThemedText style={styles.rowValue}></ThemedText>

                    <FeatherIcon
                      color="#C6C6C6"
                      name="chevron-right"
                      size={20} />
                  </Pressable>
                  </ThemedView>

              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Profile */
  profile: {
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '600',
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '400',
    color: '#848484',
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  /** Section */
  section: {
    paddingTop: 12,
  },
  sectionTitle: {
    marginVertical: 8,
    marginHorizontal: 24,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONTFAMILY.poppins_semibold,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionBody: {
    paddingLeft: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 16,
    height: 50,
  },
  rowWrapper: {
    borderTopWidth: 1,
    borderColor: '#e3e3e3',
  },
  rowFirst: {
    borderTopWidth: 0,
  },
  rowIcon: {
    width: 30,
    height: 30,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '500',

  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 17,
    fontWeight: '500',
    marginRight: 4,
  },
});