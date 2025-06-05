<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">{{ $t('navigation.profile') }}</h1>
    
    <div class="space-y-8">
      <!-- Username Change Section -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Change Username</h2>
        <p class="text-muted-foreground mb-4">Update your username here. This name will be visible to others.</p>
        <form @submit.prevent="handleUsernameChange">
          <Card>
            <CardHeader>
              <CardTitle>Username</CardTitle>
              <CardDescription>Enter your new desired username.</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <Label for="currentUsername">Current Username</Label>
                <Input id="currentUsername" :model-value="currentUser?.name || 'Loading...'" readonly disabled />
              </div>
              <div class="space-y-2">
                <Label for="newUsername">New Username</Label>
                <Input id="newUsername" v-model="newUsername" placeholder="Enter new username" />
              </div>
            </CardContent>
            <CardFooter class="border-t px-6 py-4">
              <Button type="submit">Save Username</Button>
            </CardFooter>
          </Card>
        </form>
      </section>

      <!-- Password Change Section -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Change Password</h2>
        <p class="text-muted-foreground mb-4">Update your password. Choose a strong and unique password.</p>
        <form @submit.prevent="handlePasswordChange">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Enter your current password and a new password.</CardDescription>
            </CardHeader>
            <CardContent class="space-y-4">
              <div class="space-y-2">
                <Label for="currentPassword">Current Password</Label>
                <Input id="currentPassword" v-model="currentPassword" type="password" placeholder="Enter current password" />
              </div>
              <div class="space-y-2">
                <Label for="newPassword">New Password</Label>
                <Input id="newPassword" v-model="newPassword" type="password" placeholder="Enter new password" />
              </div>
              <div class="space-y-2">
                <Label for="confirmNewPassword">Confirm New Password</Label>
                <Input id="confirmNewPassword" v-model="confirmNewPassword" type="password" placeholder="Confirm new password" />
              </div>
            </CardContent>
            <CardFooter class="border-t px-6 py-4">
              <Button type="submit">Save Password</Button>
            </CardFooter>
          </Card>
        </form>
      </section>

      <!-- Other Settings (Future) -->
       <section>
        <h2 class="text-2xl font-semibold mb-4">Other Settings</h2>
         <div class="p-4 border rounded-md bg-card">
          <p class="text-muted-foreground">Other user settings can be added here in the future.</p>
        </div>
      </section>

      <!-- Theme Customization Section -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Theme Customization</h2>
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="flex items-center justify-between">
              <Label for="theme-mode-select" class="text-base">Theme Mode</Label>
              <ClientOnly>
                <ThemeSwitcher id="theme-mode-select" />
              </ClientOnly>
            </div>
            <div class="flex items-center justify-between">
              <Label for="palette-select" class="text-base">Color Palette</Label>
              <ClientOnly>
                <PaletteSwitcher id="palette-select" />
              </ClientOnly>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card';
import ThemeSwitcher from '@/components/common/ThemeSwitcher.vue';
import PaletteSwitcher from '@/components/common/PaletteSwitcher.vue';

// Define page meta for layout or other properties if needed
definePageMeta({
  middleware: ['auth'] // Example: Protect this page, users must be logged in
});

const { t: $t } = useI18n()
const { data: currentUser, status } = useAuth() // Get current user data

const newUsername = ref('');

const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const handleUsernameChange = async () => {
  if (!newUsername.value.trim()) {
    // Basic validation: ensure new username is not empty
    alert('New username cannot be empty.'); // Replace with a proper toast notification
    return;
  }
  console.log('Attempting to change username to:', newUsername.value);
  // Placeholder for actual API call to change username
  // Example: 
  // try {
  //   const response = await $fetch('/api/user/change-username', {
  //     method: 'POST',
  //     body: { newUsername: newUsername.value }
  //   });
  //   alert('Username changed successfully!'); // Replace with toast
  //   // Optionally, refresh user data or update UI
  // } catch (error) {
  //   console.error('Failed to change username:', error);
  //   alert('Failed to change username.'); // Replace with toast
  // }
  alert('Username change functionality is not yet fully implemented. New username: ' + newUsername.value); // Replace with toast
  newUsername.value = ''; // Clear input after pseudo-submission
};

const handlePasswordChange = async () => {
  if (!currentPassword.value || !newPassword.value || !confirmNewPassword.value) {
    alert('All password fields are required.'); // Replace with toast
    return;
  }
  if (newPassword.value !== confirmNewPassword.value) {
    alert('New passwords do not match.'); // Replace with toast
    return;
  }
  // Add more validation for password strength if desired
  console.log('Attempting to change password.');
  // Placeholder for actual API call to change password
  // Example:
  // try {
  //   const response = await $fetch('/api/user/change-password', {
  //     method: 'POST',
  //     body: { 
  //       currentPassword: currentPassword.value, 
  //       newPassword: newPassword.value 
  //     }
  //   });
  //   alert('Password changed successfully!'); // Replace with toast
  // } catch (error) {
  //   console.error('Failed to change password:', error);
  //   alert('Failed to change password. Ensure current password is correct.'); // Replace with toast
  // }
  alert('Password change functionality is not yet fully implemented.'); // Replace with toast
  currentPassword.value = '';
  newPassword.value = '';
  confirmNewPassword.value = '';
};
</script>

<style scoped>
/* Add any page-specific styles here */
</style>
